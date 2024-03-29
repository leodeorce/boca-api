#!/bin/bash

### Check API health
INTERVAL=10
TIMEOUT=3
N_RETRIES=5

health=1

for attempt in $(seq 1 $N_RETRIES); do

  curl --max-time $TIMEOUT --fail -s --output /dev/null http://localhost:3333/api/health
  health=$?

  if [ "$health" -eq 0 ]; then
    break
  fi

  if [ "$attempt" -eq "$N_RETRIES" ]; then
    echo "API is unhealthy. Aborting test scripts..."
    yarn test:docker:down
    exit 1
  fi

  sleep $INTERVAL
done
