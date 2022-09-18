#!/bin/bash

### Run containers
yarn test:docker:up


### Check API health
INTERVAL=10
TIMEOUT=3
N_RETRIES=5

health=1

for attempt in $(seq 1 $N_RETRIES); do

  curl --max-time $TIMEOUT --fail -s --output /dev/null https://localhost:3333/api/health
  health=$?
  echo $health

  if [ "$health" -eq 0 ]; then
    break
  fi

  if [ "$attempt" -eq "$N_RETRIES" ]; then
    yarn test:docker:down
    echo "API is unhealthy. Aborting test scripts..."
    exit 1
  fi

  sleep $INTERVAL
done


### Run test scripts
### Could be necessary to run scripts outside of this one so Actions can fail with the tests
# yarn test


### Stop containers
yarn test:docker:down
