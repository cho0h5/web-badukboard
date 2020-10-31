package main

import (
    "log"
	"net/http"
    "github.com/gorilla/websocket"
)

var u = websocket.Upgrader{}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        u.CheckOrigin = func(r *http.Request) bool { return true }
        c, err := u.Upgrade(w, r, nil)
        if err != nil {
            log.Println(err)
        }

        for {
            // receive
            messageType, message, err := c.ReadMessage()
            if err != nil {
                log.Println(err)
            }
            log.Println(string(message))

            // send
            err = c.WriteMessage(messageType, []byte("hi"))
            if err != nil {
                log.Println(err)
            }
        }
	})

	http.ListenAndServe(":8090", nil)
}
