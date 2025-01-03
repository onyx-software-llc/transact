package db

import (
	"database/sql"
)

func connectToDb(connString string) *sql.DB {
	db, err := sql.Open("postgres", connString)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	return db
}