#!/bin/sh

array_create ()
{
  local array_name size_key
  array_name="${1}"
  size_key="${array_name}_size"
  eval "${size_key}"='0'
}

array_push ()
{
  local array_name size_key size
  array_name="${1}"
  shift 1
  size_key="${array_name}_size"
  eval "size"='"$'"${size_key}"'"'
  key="${array_name}_${size}"
  eval "${key}"='$@'
  eval ': $(('"${size_key}"'+=1))'
}

array_pop ()
{
  local array_name size_key size
  array_name="${1}"
  size_key="${array_name}_size"
  eval ': $(('"${size_key}"'-=1))'
  eval "size"='"$'"${size_key}"'"'
  key="${array_name}_${size}"
  eval "${key}"=''
}

array_concat ()
{
  local array_name size_key size value result
  array_name="${1}"
  size_key="${array_name}_size"
  eval "size"='"$'"${size_key}"'"'

  : $((index=0))
  while [ ${index} -lt ${size} ]
  do
    key="${array_name}_${index}"
    eval "value"='"$'"${key}"'"'
    : $((index+=1))
    result="${result} ${value}"
  done
  echo ${result}
}

array_create "my_array"
array_push "my_array" "Hello"
array_push "my_array" "World"
new_var=$(array_concat "my_array")
echo $new_var
