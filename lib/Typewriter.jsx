export default class Typewriter {
    #queue = []
    #element
    #loop
    #typingSpeed
    #deletingSpeed
    #parent
    #addToQueue(cb) {
        this.#queue.push(() => new Promise(cb))
    }
    #scrollDiv(pos = null) {
        const rect = this.#parent.getBoundingClientRect()
        window.scrollTo({ top: pos ? pos : rect.height })
    }
    constructor(
        parent,
        { loop = false, typingSpeed = 50, deleteSpeed = 50, className } = {}
    ) {
        this.#element = document.createElement('div')
        this.#element.className = className
        this.#loop = loop
        this.#typingSpeed = typingSpeed
        this.#deletingSpeed = deleteSpeed
        this.#parent = parent
    }

    typeString(string) {
        this.#parent.append(this.#element)
        
        if(this.#typingSpeed === 0) {
            this.#element.append(string)
        }
        else {
            this.#addToQueue(resolve => {
                let i = 0
                const interval = setInterval(() => {
                    this.#element.append(string[i])
                    this.#scrollDiv()
                    i++
                    if (i >= string.length) {
                        clearInterval(interval)
                        resolve()
                    }
                }, this.#typingSpeed)
            })
        }

        return this
    }

    deleteChars(number) {
        this.#addToQueue(resolve => {
            let i = 0
            const interval = setInterval(() => {
                this.#element.innerText = this.#element.innerText.substring(
                    0,
                    this.#element.innerText.length - 1
                )
                i++
                if (i >= number) {
                    clearInterval(interval)
                    resolve()
                }
            }, this.#deletingSpeed)
        })

        return this
    }

    deleteAll(deleteSpeed = this.#deletingSpeed) {
        this.#addToQueue(resolve => {
            const interval = setInterval(() => {
                this.#element.innerText = this.#element.innerText.substring(
                    0,
                    this.#element.innerText.length - 1
                )
                if (this.#element.innerText.length === 0) {
                    clearInterval(interval)
                    resolve()
                }
            }, deleteSpeed)
        })

        return this
    }

    pauseFor(duration) {
        this.#addToQueue(resolve => {
            setTimeout(resolve, duration)
        })

        return this
    }

    async start() {
        let cb = this.#queue.shift()
        while (cb != null) {
            await cb()
            if (this.#loop) this.#queue.push(cb)
            cb = this.#queue.shift()
        }

        return this
    }
}