import Typewriter from "../Typewriter"
import styles from '../../styles/Home.module.css'
import { randomNumber } from "../util/util"

export default class RockPaperScissors {
    #parent
    #player = []
    #computer = []
    #playerWins = 0
    #computerWins = 0
    #round = 1
    constructor(parent) {
        this.#parent = parent
        this.winner = false
        this.bestOf = null
        this.difficulty = null
    }
    start() {
        const typewriter = new Typewriter(this.#parent, { typingSpeed: 1, className: styles.promptClass })

        typewriter.typeString('How many rounds would you like to play? (1-9, odd number)').start()
    }
    set setBestOf(value) {
        this.bestOf = value
    }
    set setDifficulty(value) {
        this.difficulty = value
    }
    getScore() {
        const typewriter = new Typewriter(this.#parent, { typingSpeed: 1, className: styles.tieClass })
        return typewriter.typeString(`Player: ${this.#playerWins} | Computer: ${this.#computerWins}`).start()
    }
    promptPlayer() {
        const typewriter = new Typewriter(this.#parent, { typingSpeed: 1, className: styles.promptClass })
        typewriter.typeString('(R)ock, (P)aper, or (S)cissors?').start()
    }

    async setPlayer(value) {
        const errTypewriter = new Typewriter(this.#parent, { typingSpeed: 1, className: styles.errClass })
        if (!['r', 'p', 's', 'rock', 'paper', 'scissors'].includes(value.toLowerCase())) {
            errTypewriter.typeString('Invalid input.\n').start()
            this.promptPlayer()
            return
        }
        this.#player.push(value.startsWith('r') ? 'rock' : value.startsWith('p') ? 'paper' : 'scissors')

        switch (this.difficulty) {
            case 1:
                const random1 = randomNumber(0, 100)
                if (random1 < 20) { // win
                    await this.#setComputer('win', value)
                } else if (random1 >= 20 && random1 < 80) { // lose
                    await this.#setComputer('lose', value)
                } else { // tie
                    await this.#setComputer('tie', value)
                }
                break
            case 2:
                const random2 = randomNumber(0, 100)
                if (random2 < 30) { // win
                    await this.#setComputer('win', value)
                } else if (random2 >= 30 && random2 < 85) { // lose
                    await this.#setComputer('lose', value)
                } else { // tie
                    await this.#setComputer('tie', value)
                }
                break
            case 3:
                const random3 = randomNumber(0, 100)
                if (random3 < 50) { // win
                    await this.#setComputer('win', value)
                } else if (random3 >= 50 && random3 < 95) { // lose
                    await this.#setComputer('lose', value)
                } else { // tie
                    await this.#setComputer('tie', value)
                }
                break
            case 4:
                const random4 = randomNumber(0, 100)
                if (random4 < 80) { // win
                    await this.#setComputer('win', value)
                } else if (random4 >= 80 && random4 < 98) { // lose
                    await this.#setComputer('lose', value)
                } else { // tie
                    await this.#setComputer('tie', value)
                }
                break
            case 5:
                await this.#setComputer('random', value)
                break
            default:
                break
        }
    }

    async #setComputer(condition, playerValue) {
        const promptTypewriter = new Typewriter(this.#parent, { typingSpeed: 1, className: styles.promptClass })

        const winTypeWriter = new Typewriter(this.#parent, { typingSpeed: 1, className: styles.winnerClass })
        const loseTypeWriter = new Typewriter(this.#parent, { typingSpeed: 1, className: styles.errClass })
        const tieTypeWriter = new Typewriter(this.#parent, { typingSpeed: 1, className: styles.tieClass })
        if (condition === 'win') {
            if (playerValue.startsWith('r')) {
                this.#computer.push('paper')
            } else if (playerValue.startsWith('p')) {
                this.#computer.push('scissors')
            } else if (playerValue.startsWith('s')) {
                this.#computer.push('rock')
            }
            await loseTypeWriter.typeString(`Computer chose ${this.#computer[this.#computer.length - 1]}, you chose ${this.#player[this.#player.length - 1]}. You lose round ${this.#round}!`).start()
            this.#computerWins++
        } else if (condition === 'lose') {
            if (playerValue.startsWith('r')) {
                this.#computer.push('scissors')
            } else if (playerValue.startsWith('p')) {
                this.#computer.push('rock')
            } else if (playerValue.startsWith('s')) {
                this.#computer.push('paper')
            }
            await winTypeWriter.typeString(`Computer chose ${this.#computer[this.#computer.length - 1]}, you chose ${this.#player[this.#player.length - 1]}. You win round ${this.#round}!`).start()
            this.#playerWins++
        } else if (condition === 'tie') {
            if (playerValue.startsWith('r')) {
                this.#computer.push('rock')
            } else if (playerValue.startsWith('p')) {
                this.#computer.push('paper')
            } else if (playerValue.startsWith('s')) {
                this.#computer.push('scissors')
            }
            await tieTypeWriter.typeString(`Computer chose ${this.#computer[this.#computer.length - 1]}, you chose ${this.#player[this.#player.length - 1]}. Round ${this.#round} is a tie!`).start()
        } else if (condition === 'random') {
            this.#computer.push(['rock', 'paper', 'scissors'][Math.round(randomNumber(0, 2))])
            if (this.#computer[this.#computer.length - 1] === this.#player[this.#player.length - 1]) {
                await tieTypeWriter.typeString(`Computer chose ${this.#computer[this.#computer.length - 1]}, you chose ${this.#player[this.#player.length - 1]}. Round ${this.#round} is a tie!`).start()
            } else if (this.#computer[this.#computer.length - 1] === 'rock' && this.#player[this.#player.length - 1] === 'paper') {
                await winTypeWriter.typeString(`Computer chose ${this.#computer[this.#computer.length - 1]}, you chose ${this.#player[this.#player.length - 1]}. You win round ${this.#round}!`).start()
                this.#playerWins++
            } else if (this.#computer[this.#computer.length - 1] === 'rock' && this.#player[this.#player.length - 1] === 'scissors') {
                await loseTypeWriter.typeString(`Computer chose ${this.#computer[this.#computer.length - 1]}, you chose ${this.#player[this.#player.length - 1]}. You lose round ${this.#round}!`).start()
                this.#computerWins++
            } else if (this.#computer[this.#computer.length - 1] === 'paper' && this.#player[this.#player.length - 1] === 'rock') {
                await loseTypeWriter.typeString(`Computer chose ${this.#computer[this.#computer.length - 1]}, you chose ${this.#player[this.#player.length - 1]}. You lose round ${this.#round}!`).start()
                this.#computerWins++
            } else if (this.#computer[this.#computer.length - 1] === 'paper' && this.#player[this.#player.length - 1] === 'scissors') {
                await winTypeWriter.typeString(`Computer chose ${this.#computer[this.#computer.length - 1]}, you chose ${this.#player[this.#player.length - 1]}. You win round ${this.#round}!`).start()
                this.#playerWins++
            } else if (this.#computer[this.#computer.length - 1] === 'scissors' && this.#player[this.#player.length - 1] === 'rock') {
                await winTypeWriter.typeString(`Computer chose ${this.#computer[this.#computer.length - 1]}, you chose ${this.#player[this.#player.length - 1]}. You win round ${this.#round}!`).start()
                this.#playerWins++
            } else if (this.#computer[this.#computer.length - 1] === 'scissors' && this.#player[this.#player.length - 1] === 'paper') {
                await loseTypeWriter.typeString(`Computer chose ${this.#computer[this.#computer.length - 1]}, you chose ${this.#player[this.#player.length - 1]}. You lose round ${this.#round}!`).start()
                this.#computerWins++
            }
        }
        
        this.#round++

        if (this.#round - 1 == this.bestOf || this.bestOf - (this.#round - 1) < Math.abs(this.#computerWins - this.#playerWins)) {
            const winTypeWriter = new Typewriter(this.#parent, { typingSpeed: 1, className: styles.winnerClass })
            const loseTypeWriter = new Typewriter(this.#parent, { typingSpeed: 1, className: styles.errClass })
            const tieTypeWriter = new Typewriter(this.#parent, { typingSpeed: 1, className: styles.tieClass })

            if (this.#playerWins > this.#computerWins) {
                await winTypeWriter.typeString(`You win the game!`).start()
                this.getScore()
            } else if (this.#playerWins < this.#computerWins) {
                await loseTypeWriter.typeString(`You lose the game!`).start()
                this.getScore()
            } else {
                await tieTypeWriter.typeString(`It's a tie!`).start()
                this.getScore()
            }
            this.winner = true
        } else {
            await promptTypewriter.typeString('(R)ock, (P)aper, or (S)cissors?').start()
        }
    }

    end() {
        this.winner = false
        this.bestOf = null
        this.difficulty = null
        this.#player = []
        this.#computer = []
        this.#round = 1
        this.#playerWins = 0
        this.#computerWins = 0
    }
}