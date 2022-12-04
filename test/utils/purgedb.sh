#!/bin/bash

str1="TRUNCATE problemtable, contesttable, sitetable, logtable, "
str2="sitetimetable, usertable, answertable, tasktable, langtable, "
str3="runtable, clartable, bkptable CASCADE"

docker exec boca-postgres-test psql -U postgres -p 5433 -d testdb -c "$str1 $str2 $str3"
