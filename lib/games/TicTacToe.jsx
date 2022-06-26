import Typewriter from "../Typewriter"
import styles from '../../styles/Home.module.css'

export default class TicTacToe {
    constructor(parent) {
        this.board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
        this.winner = false
        this.parent = parent
        this.turn = 1
    }
    start() {
        const typewriter = new Typewriter(this.parent, { typingSpeed: 1, className: styles.promptClass })

        this.#printBoard()

        typewriter.typeString(`Player 1 (X) where would you like to place on the board? (type a number 1-9, 1 for top left and goes left to right)`).start()
    }
    end() {
        this.board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
        this.winner = null
        this.turn = 1
    }
    #printBoard() {
        const typewriter = new Typewriter(this.parent, { typingSpeed: 1, className: styles.boardClass })

        typewriter
            .typeString(` ---`.repeat(3) + '\n')
            .typeString(`| ${this.#xOrO(this.board[0][0]) || "1"} | ${this.#xOrO(this.board[0][1]) || "2"} | ${this.#xOrO(this.board[0][2]) || "3"} |` + '\n')
            .typeString(` ---`.repeat(3) + '\n')
            .typeString(`| ${this.#xOrO(this.board[1][0]) || "4"} | ${this.#xOrO(this.board[1][1]) || "5"} | ${this.#xOrO(this.board[1][2]) || "6"} |` + '\n')
            .typeString(` ---`.repeat(3) + '\n')
            .typeString(`| ${this.#xOrO(this.board[2][0]) || "7"} | ${this.#xOrO(this.board[2][1]) || "8"} | ${this.#xOrO(this.board[2][2]) || "9"} |` + '\n')
            .typeString(` ---`.repeat(3) + '\n')
            .start()
    }
    #checkWin() {
        if (this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2] && this.board[0][0] != 0) {
            this.winner = true
            const winNumber = this.board[0][0]
            const winLetter = this.#xOrO(winNumber)
            return `The winner is player ${winNumber}! (${winLetter})`
        }  // diagonal top left to bottom right
        else if (this.board[0][2] == this.board[1][1] && this.board[1][1] == this.board[2][0] && this.board[0][2] != 0) {
            this.winner = true
            const winNumber = this.board[0][2]
            const winLetter = this.#xOrO(winNumber)
            return `The winner is player ${winNumber}! (${winLetter})`
        }  // diagonal top right to bottom left
        else if (this.board[0][0] == this.board[1][0] && this.board[0][0] == this.board[2][0] && this.board[0][0] != 0) {
            this.winner = true
            const winNumber = this.board[0][0]
            const winLetter = this.#xOrO(winNumber)
            return `The winner is player ${winNumber}! (${winLetter})`
        }  // very left column
        else if (this.board[0][1] == this.board[1][1] && this.board[0][1] == this.board[2][1] && this.board[0][1] != 0) {
            this.winner = true
            const winNumber = this.board[0][1]
            const winLetter = this.#xOrO(winNumber)
            return `The winner is player ${winNumber}! (${winLetter})`
        }  // middle column
        else if (this.board[0][2] == this.board[1][2] && this.board[0][2] == this.board[2][2] && this.board[0][2] != 0) {
            this.winner = true
            const winNumber = this.board[0][2]
            const winLetter = this.#xOrO(winNumber)
            return `The winner is player ${winNumber}! (${winLetter})`
        }  // very right column
        else if (this.board[0][0] == this.board[0][1] && this.board[0][0] == this.board[0][2] && this.board[0][0] != 0) {
            this.winner = true
            const winNumber = this.board[0][0]
            const winLetter = this.#xOrO(winNumber)
            return `The winner is player ${winNumber}! (${winLetter})`
        }  // top row
        else if (this.board[1][0] == this.board[1][1] && this.board[1][0] == this.board[1][2] && this.board[1][0] != 0) {
            this.winner = true
            const winNumber = this.board[1][0]
            const winLetter = this.#xOrO(winNumber)
            return `The winner is player ${winNumber}! (${winLetter})`
        }  // middle row
        else if (this.board[2][0] == this.board[2][1] && this.board[2][0] == this.board[2][2] && this.board[2][0] != 0) {
            this.winner = true
            const winNumber = this.board[2][0]
            const winLetter = this.#xOrO(winNumber)
            return `The winner is player ${winNumber}! (${winLetter})`
        }  // bottom row
        else {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (this.board[i][j] == 0) {
                        return false
                    }
                }
            }
            this.winner = true
            return 'TIE'
        }
    }
    #convert(num) {
        if (0 < num && num <= 3) {
            return [0, num - 1]
        }
        else if (3 < num && num <= 6) {
            return [1, num - 4]
        }
        else if (6 < num && num <= 9) {
            return [2, num - 7]
        }
    }
    #xOrO(num) {
        if (num == 1) {
            return 'X'
        }
        else if (num == 2) {
            return 'O'
        }
        else {
            return null
        }
    }
    playerOne(num) {
        const errorTypewriter = new Typewriter(this.parent, { typingSpeed: 1, className: styles.errClass })
        const promptTypewriter = new Typewriter(this.parent, { typingSpeed: 1, className: styles.promptClass })
        const winnerTypewriter = new Typewriter(this.parent, { typingSpeed: 1, className: styles.winnerClass })
        try {
            if (num > 9 || num < 1) {
                errorTypewriter.typeString('Please enter an integer 1-9 (1 for top left and goes left to right) ').start()
            }
            else {
                const [first_digit, second_digit] = this.#convert(num)
                if (this.board[first_digit][second_digit] == 0) {
                    this.board[first_digit][second_digit] = 1
                    this.#printBoard()
                    this.turn = 2

                    const winner = this.#checkWin()
                    if (winner) {
                        winnerTypewriter.typeString(winner == 'TIE' ? 'The game is a Tie!' : winner).start()
                    } else {
                        promptTypewriter.typeString(`Player 2 (O) where would you like to place on the board? (type a number 1-9, 1 for top left and goes left to right)`).start()
                    }
                }
                else {
                    errorTypewriter.typeString('That spot is already taken! Enter a number 1-9, make sure to take an empty spot!').start()
                    this.#printBoard()
                }
            }
        } catch (err) {
            errorTypewriter.typeString('Oops. There was an error.').start()
        }
    }
    playerTwo(num) {
        const errorTypewriter = new Typewriter(this.parent, { typingSpeed: 1, className: styles.errClass })
        const promptTypewriter = new Typewriter(this.parent, { typingSpeed: 1, className: styles.promptClass })
        const winnerTypewriter = new Typewriter(this.parent, { typingSpeed: 1, className: styles.winnerClass })
        try {
            if (num > 9 || num < 1) {
                errorTypewriter.typeString('Please enter an integer 1-9 (1 for top left and goes left to right) ').start()
            }
            else {
                const [first_digit, second_digit] = this.#convert(num)
                if (this.board[first_digit][second_digit] == 0) {
                    this.board[first_digit][second_digit] = 2
                    this.#printBoard()
                    this.turn = 1

                    const winner = this.#checkWin()
                    if (winner) {
                        winnerTypewriter.typeString(winner == 'TIE' ? 'The game is a Tie!' : winner).start()
                    } else {
                        promptTypewriter.typeString(`Player 1 (X) where would you like to place on the board? (type a number 1-9, 1 for top left and goes left to right)`).start()
                    }
                }
                else {
                    errorTypewriter.typeString('That spot is already taken! Enter a number 1-9, make sure to take an empty spot!').start()
                    this.#printBoard()
                }
            }
        } catch (err) {
            errorTypewriter.typeString('Oops. There was an error.').start()
        }
    }
}