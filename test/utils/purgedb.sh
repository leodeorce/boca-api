#!/bin/bash

export PGPASSWORD=admin && psql -h localhost -U postgres -p 5433 -d testdb -f ./test/utils/purgedb.sql
# export PGPASSWORD=dAm0HAiC && psql -h localhost -U bocauser -p 5432 -d bocadb -f ./test/utils/purgedb.sql
