package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/spf13/cast"
)

type Rock struct {
	X     int `json:"x"`
	Y     int `json:"y"`
	State int `json:"state"`
}

var u = websocket.Upgrader{}
var rocks = []Rock{}
var clients []*websocket.Conn

func main() {
	clients = make([]*websocket.Conn, 0)

	http.HandleFunc("/ws", webSocket)
	http.Handle("/", http.FileServer(http.Dir(".")))

	http.ListenAndServe(":5500", nil)
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
			send(c, messageType)
		case "downRock":
			data := cast.ToStringMapInt(obj["data"])
			log.Println(data["x"], data["y"], data["state"])

			// record rock
			rock := Rock{data["x"], data["y"], data["state"]}
			rocks = append(rocks, rock)
			log.Println(rocks)

			// send
			send(c, messageType)
		case "removeAll":
			rocks = []Rock{}

			// send
			send(c, messageType)
		}

	}
}

func send(client *websocket.Conn, messageType int) {
	b, err := json.Marshal(rocks)
	chkError(err)

	for _, client := range clients {
		err = client.WriteMessage(messageType, b)
		if err != nil {
			for i, c := range clients {
				if c == client {
					clients = append(clients[:i], clients[i+1:]...)
				}
			}
		}
		chkError(err)
	}
}

func chkError(err error) {
	if err != nil {
		log.Println(err)
	}
}
