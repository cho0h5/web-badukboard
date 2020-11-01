package main

import (
    "log"
	"net/http"
    "encoding/json"
    "github.com/spf13/cast"
    "github.com/gorilla/websocket"
)

var u = websocket.Upgrader{}
var rocks = map[int]map[int]int{};
var clients []*websocket.Conn

func main() {
    clients = make([]*websocket.Conn, 0)

	http.HandleFunc("/", webSocket)

	http.ListenAndServe(":8090", nil)
}

func webSocket(w http.ResponseWriter, r *http.Request) {
    // ready websocket
    u.CheckOrigin = func(r *http.Request) bool { return true }
    c, err := u.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
    }

    clients = append(clients, c)

    // receive and send
    for {
        // receive
        messageType, message, err := c.ReadMessage()
        if err != nil {
            log.Println(err)
            break
        }

        var obj map[string]interface{}
        err = json.Unmarshal(message, &obj)
        chkError(err)

        log.Println(obj["event"])

        switch obj["event"] {
        case "open":
            log.Println("someone entered")

            // send
            b, err := json.Marshal(rocks)
            chkError(err)
            err = c.WriteMessage(messageType, b)
            chkError(err)

        case "downRock":
            data := cast.ToStringMapInt(obj["data"])
            log.Println(data["x"], data["y"], data["state"])

            // record rock
            if _, ok := rocks[data["x"]]; !ok {
                rocks[data["x"]] = map[int]int{}
            }
            rocks[data["x"]][data["y"]] = data["state"]

            // send
            b, err := json.Marshal(rocks)
            chkError(err)

            for _, client := range clients {
                err = client.WriteMessage(messageType, b)
                chkError(err)
            }
        case "removeAll":
            rocks = make(map[int]map[int]int)

            // send
            b, err := json.Marshal(rocks)
            chkError(err)

            for _, client := range clients {
                err = client.WriteMessage(messageType, b)
                chkError(err)
            }
        }

    }
}

func chkError(err error) {
    if err != nil {
        log.Println(err)
    }
}
