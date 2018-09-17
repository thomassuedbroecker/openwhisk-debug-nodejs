#!/bin/bash
# Information steps:
# 1) chmod u+x git-commit.sh
# 2) ./git-commit.sh

echo "--> check Status of instances"
cd ..
git add -A
echo "--> Application Name: "
read app_name

for ((i=30; i>0; i--))
    do
       sleep 1
       echo -n "$i "
       bx cf app $app_name
    done
echo "--> check Status of instances - END"
