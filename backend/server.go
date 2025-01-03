package main

import (
	"net/http"
	"os"

	_ "github.com/joho/godotenv/autoload"
	"github.com/labstack/echo/v4"
)

type User struct {
	ID int `json:"id"`
	Name string `json:"name"`
}

type Transaction struct {
	ID int `json:"id"`
	Name string `json:"name"`
	Amount float32 `json:"amount"`
}

func main() {
	e := echo.New()

	e.GET("/ping", func(c echo.Context) error {
		return c.JSONPretty(http.StatusOK, "Pong", "  ")
	})

	// Need a route to 
	e.GET("/token", func(c echo.Context) error {
		u := &User{
			ID:   1,
			Name: "Josiah Roa",
		}
		return c.JSONPretty(http.StatusOK, u, "  ")
	})

	e.GET("/transactions", func(c echo.Context) error {
		t := &Transaction {
			ID: 1,
			Name: "Mc Donalds",
			Amount: 18.11,
		}
		return c.JSONPretty(http.StatusOK, t, "  ")
	})

	port := os.Getenv("PORT")
	if (port == "") {
		port = "8080"
	}
	e.Logger.Fatal(e.Start(":"+port))
}