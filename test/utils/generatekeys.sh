#!/bin/bash

PRIVATE_KEY_FILE="./secrets/private.key"
PUBLIC_KEY_FILE="./secrets/public.key"

openssl genpkey -algorithm RSA -out $PRIVATE_KEY_FILE
openssl rsa -in $PRIVATE_KEY_FILE -outform PEM -pubout -out $PUBLIC_KEY_FILE

if [ $? -eq 0 ]; then
  echo "Par de chaves RSA gerado com sucesso"
else
  echo "Erro ao gerar par de chaves RSA"
fi
