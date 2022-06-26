import Typewriter from "../Typewriter"
import styles from '../../styles/Home.module.css'

export default class RockPaperScissors {
    #parent
    #bestOf
    constructor(parent) {
        this.#parent = parent
        this.winner = false
        this.#bestOf = 3
    }
}