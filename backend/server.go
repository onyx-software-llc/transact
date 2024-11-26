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

func main() {
	e := echo.New()

	e.GET("/", func(c echo.Context) error {
		u := &User{
			ID:   1,
			Name: "Josiah Roa",
		}
		return c.JSONPretty(http.StatusOK, u, "  ")
	})

	port := os.Getenv("PORT")
	if (port == "") {
		port = "8080"
	}
	e.Logger.Fatal(e.Start(":"+port))
}