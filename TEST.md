





```sh-out esbuild <<'EOF' | rollup

const conf1 = {
    key1: "key1",
    key2: "key2",
};

const conf2 = {
    key3: "key3",
    key4: "key4",
};

const full = {
    ...conf1,
    ...conf2,
};

function pure() {
    console.log("conf1",  conf1);
}

pure()

EOF
const conf1 = {
  key1: "key1",
  key2: "key2"
};
function pure() {
  console.log("conf1", conf1);
}
pure();
```
