let name = "ts"

console.log(name)

function getName() {
    return name
}

console.log(getName())

function setName(name) {
    this.name = name
}

setName("Mike")

console.log(getName())