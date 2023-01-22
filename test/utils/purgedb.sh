#!/bin/bash

export PGPASSWORD=admin && psql -h localhost -U postgres -p 5433 -d testdb -f ./test/utils/purgedb.sql
