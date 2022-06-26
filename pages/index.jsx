import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import TicTacToe from '../lib/games/TicTacToe'
import Typewriter from '../lib/Typewriter'
import { deviceType, FILE_PREFIX } from '../lib/util/util'
import styles from '../styles/Home.module.css'

const USER_TEXT = 'C:\\Users\\Aarush\\Portfolio>' + ' '

// typewriter, terminal style

// terminal commands
// clear: clear the display, help: display help, exit: exit the terminal/close the window,
// projects: display projects from github, about: display about/who i am, contact: display contact (email, phone, etc)

// secret commands like hangman, tic-tac-toe, ascii, and more will be added soon
const commands = ['clear', 'help', 'exit', 'projects', 'about', 'contact']

const CHAR_WIDTH = 8.1879
const ASCII_ART_SPEED = 1

export default function Home() {
    const consoleDisplayRef = useRef(null)
    const consoleInputDisplayRef = useRef(null)
    const consoleInputRef = useRef(null)
    const consoleInputFormRef = useRef(null)
    const [mount, setMount] = useState(false)
    const [inputText, setInputText] = useState('')

    const caretRef = useRef(null)
    const lineNumber = useRef(0).current

    const history = useRef(['']).current
    const historyIndex = useRef(0).current

    const game = useRef(null).current
    const gameStarted = useRef(false).current

    const typing = useRef(false).current

    useEffect(() => {
        setMount(!mount)
        if (!mount) return // prevent duplicated rendering

        if (deviceType() === 'desktop') {
            // Initial Ascii Art
            const mainTypewriter1 = new Typewriter(consoleDisplayRef.current, { typingSpeed: ASCII_ART_SPEED, className: styles.asciiStartClass1 })
            const mainTypewriter2 = new Typewriter(consoleDisplayRef.current, { typingSpeed: ASCII_ART_SPEED, className: styles.asciiStartClass2 })
            const mainTypewriter3 = new Typewriter(consoleDisplayRef.current, { typingSpeed: ASCII_ART_SPEED, className: styles.asciiStartClass3 })
            mainTypewriter1.typeString(`
                             *       *             *         ..-. *   .    *
                           .         *   *    .-. *  .  _  _/ ^  \\   _   .   *
                                 *           /   \\     (( / ^    ^\\_/ \\       *  .
                                _    .   .--'\\/\\_ \\     \`/ \`-._    /  ^\\  *  .-.
                            *  / \\_  ___/ ^     ^\\/\\'__ /  ____   /\\   /\\  _/  ^\\ *
                              /    \\/ _/__________\\________|  |_____  / .\`/    ./^\\  .
                         .   /\\/\\  / /______________________________\\ \\  /\\    /   \\
                            /    \\/ /________________________________\\ \\/^ \\/\\/    ^\\
                          /\\  .-  \\   ||___|___||||||||||||___|__|||   /^-._        ^\\
                         /  \`-.__ ^\\  ||___|___||||||   |||___|__|||  /     \`._    _.\`\\
                        /        \`. \\ |||||||||||||||\`  |||||||||||| /            \`    \\
                        ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
                                                     /|\\
                                                    / | \\
                                                   /  |  \\
                                                  /   |   \\
                                                 /    |    \\
                                                /     |     \\
                                               /      |      \\`).start()
            mainTypewriter2.typeString(`
         _____                            .__       _______                                   /\\       
        /  _  \\ _____ _______ __ __  _____|  |__    \\      \\ _____ ____________    ____    ___)/ ______
       /  /_\\  \\\\__  \\\\_  __ \\  |  \\/  ___/  |  \\   /   |   \\\\__  \\\\_  __ \\__  \\  /    \\  / ___\\/  ___/
      /    |    \\/ __ \\|  | \\/  |  /\\___ \\|   Y  \\ /    |    \\/ __ \\|  | \\// __ \\|   |  \\/ /_/  >___ \\ 
      \\____|__  (____  /__|  |____//____  >___|  / \\____|__  (____  /__|  (____  /___|  /\\___  /____  >
              \\/     \\/                 \\/     \\/          \\/     \\/           \\/     \\//_____/     \\/`).start()
            mainTypewriter3.typeString(`
        ___      ___           ___                  ___       ___                     ___           ___     
       /\\  \\    /\\  \\         /\\  \\                /\\__\\     /\\  \\   ___             /\\  \\         /\\  \\    
      /::\\  \\  /::\\  \\       /::\\  \\       ___    /:/ _/_   /::\\  \\ /\\  \\           /:/__/        /::\\  \\   
     /:/\\:\\__\\/:/\\:\\  \\     /:/\\:\\__\\     /\\__\\  /:/ /\\__\\ /:/\\:\\  \\\\:\\  \\         /::\\  \\       /:/\\:\\  \\  
    /:/ /:/  /:/  \\:\\  \\   /:/ /:/  /    /:/  / /:/ /:/  //:/  \\:\\  \\\\:\\  \\     ___\\/\\:\\  \\     /:/  \\:\\  \\ 
   /:/_/:/  /:/__/ \\:\\__\\ /:/_/:/__/___ /:/__/ /:/_/:/  //:/__/ \\:\\__\\\\:\\  \\   /\\__\\  \\:\\  \\   /:/__/ \\:\\__\\
   \\:\\/:/  /\\:\\  \\ /:/  / \\:\\/:::::/  //::\\  \\ \\:\\/:/  / \\:\\  \\ /:/  / \\:\\  \\ /:/  /   \\:\\  \\__\\:\\  \\ /:/  /
    \\::/__/  \\:\\  /:/  /   \\::/~~/~~~~/:/\\:\\  \\ \\::/__/   \\:\\  /:/  /   \\:\\  /:/  /     \\:\\/\\__\\\\:\\  /:/  / 
     \\:\\  \\   \\:\\/:/  /     \\:\\~~\\    \\/__\\:\\  \\ \\:\\  \\    \\:\\/:/  /     \\:\\/:/  /       \\::/  / \\:\\/:/  /  
      \\:\\__\\   \\::/  /       \\:\\__\\        \\:\\__\\ \\:\\__\\    \\::/  /       \\::/  /        /:/  /   \\::/  /   
       \\/__/    \\/__/         \\/__/         \\/__/  \\/__/     \\/__/         \\/__/         \\/__/     \\/__/    
        `).start()
        }

        // Initialize Games
        const ttt = new TicTacToe(consoleDisplayRef.current)

        const setCursorPos = (selectionPos) => {
            caretRef.current.style.left = `${220 + (selectionPos * CHAR_WIDTH) - (lineNumber * consoleInputDisplayRef.current.clientWidth)}px`
        }
        const handleConsoleSubmit = async e => { // type out in display once submitted command
            e.preventDefault()
            setCursorPos(0)

            if (typing) return

            typing = true

            const formData = new FormData(e.target)
            const typedCommand = formData.get('command')

            // add to history
            history = [...history, typedCommand]
            historyIndex = 0

            // clear inputs
            setInputText('')
            e.target.reset()

            // start basic typewriters
            const commandTypewriter = new Typewriter(consoleDisplayRef.current, { typingSpeed: 0, className: styles.commandClass })
            commandTypewriter.typeString(`${USER_TEXT}${typedCommand}`).start()

            const responseTypewriter = new Typewriter(consoleDisplayRef.current, { typingSpeed: 30, className: styles.responseClass })

            if (!game) {
                switch (typedCommand) {
                    case 'clear':
                        consoleDisplayRef.current.innerHTML = ''
                        responseTypewriter.typeString('Console was cleared.').start().then(() => typing = false)
                        game = null
                        gameStarted = false
                        ttt.end()
                        break;
                    case 'help':
                        responseTypewriter.typeString(`Commands: ${commands.join(', ')}`).start().then(() => typing = false)
                        break;
                    case 'exit':
                        const exitTypewriter = new Typewriter(consoleDisplayRef.current, { typingSpeed: 40, className: styles.errClass })
                        exitTypewriter.typeString('Closing console... ')
                            .deleteChars(3)
                            .typeString('...')
                            .deleteChars(3)
                            .typeString('...')
                            .deleteChars(3)
                            .typeString('...')
                            .deleteChars(3)
                            .typeString('...')
                            .start().then(() => typing = false)
                        setTimeout(() => {
                            window.open("", '_self').window.close();
                        }, 2000)
                        break;
                    case 'projects':
                        const repositoriesJSON = await fetch('https://api.github.com/users/aarush-narang/repos').then(res => res.json()).catch(err => console.log(err))

                        const repositories = await Promise.all(await repositoriesJSON.map(async repo => {
                            const languagesJSON = await fetch(`https://api.github.com/repos/aarush-narang/${repo.name}/languages`).then(res => res.json()).catch(err => console.log(err))
                            return {
                                name: repo.full_name,
                                url: repo.html_url,
                                description: repo.description ? repo.description : 'No description provided.',
                                fork: repo.fork,
                                languages: Object.keys(languagesJSON).length ? Object.keys(languagesJSON).join(', ') : 'No languages.'
                            }
                        }))

                        for (const repo of repositories) {
                            const nameTypewriter = new Typewriter(consoleDisplayRef.current, { typingSpeed: 2, className: styles.nameClass })
                            const urlTypewriter = new Typewriter(consoleDisplayRef.current, { typingSpeed: 4, className: styles.urlClass })
                            const descriptionTypewriter = new Typewriter(consoleDisplayRef.current, { typingSpeed: 8, className: styles.descriptionClass })
                            const languagesTypewriter = new Typewriter(consoleDisplayRef.current, { typingSpeed: 16, className: styles.languagesClass })
                            const separatorTypewriter = new Typewriter(consoleDisplayRef.current, { typingSpeed: 1, className: styles.separatorClass })

                            await nameTypewriter.typeString(`${repo.name}${repo.fork ? ' (forked)' : ''}`).start()
                            await descriptionTypewriter.typeString(`${repo.description}`).start()
                            await languagesTypewriter.typeString(`${repo.languages}`).start()
                            await urlTypewriter.typeString(`${repo.url}`).start()
                            await separatorTypewriter.typeString('-'.repeat(Math.max(repo.name.length + repo.fork ? ' (forked)'.length : 0, repo.description.length, repo.languages.length, repo.url.length))).start()
                        }
                        typing = false
                        break;
                    case 'about':
                        responseTypewriter
                            .typeString('I am 16 years old and am passionate about building beautiful, responsive websites and applications. I have a passion for learning new technologies and constantly learning new things. You can find my projects by running the "projects" command and you can find my contact information by running the "contact" command.')
                            .start().then(() => typing = false)
                        break;
                    case 'contact':
                        responseTypewriter
                            .typeString('Email: aarushnarang@gmail.com\n')
                            .pauseFor(100)
                            .typeString('Phone #: 1-(408)-568-8678\n')
                            .pauseFor(100)
                            .typeString('GitHub: https://github.com/aarush-narang')
                            .start().then(() => typing = false)
                        break;
                    case 'ping':
                        responseTypewriter.typeString('Pong!').start().then(() => typing = false)
                        break;
                    case 'hangman':
                        break;
                    case 'ttt':
                        responseTypewriter
                            .typeString('Welcome to Tic-Tac-Toe! Type "start" to start. Or type "exit" to exit at anytime.')
                            .start().then(() => typing = false)
                        game = 'ttt'
                        break;
                    case 'ascii':
                        break;
                    case '':
                        const test = await fetch('/api/hello').then(res => res.json()).catch(err => console.log(err))
                        console.log(test)
                        typing = false
                        break;
                    default:
                        responseTypewriter.typeString('Command not found').start().then(() => typing = false)
                        break;
                }
            }
            else if (game === 'ttt') {
                const errorTypewriter = new Typewriter(consoleDisplayRef.current, { typingSpeed: 1, className: styles.errClass })
                switch (typedCommand.toLowerCase()) {
                    case 'exit':
                        errorTypewriter.typeString('Exiting Tic-Tac-Toe...').start().then(() => typing = false)
                        game = null
                        gameStarted = false
                        ttt.end()
                        break;
                    case 'start':
                        if (gameStarted) {
                            responseTypewriter.typeString('Game already started!').start().then(() => typing = false)
                            break
                        }
                        responseTypewriter.typeString('Starting Tic-Tac-Toe...').start().then(() => typing = false)
                        ttt.start()
                        gameStarted = true
                        break;
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                        if (ttt.turn == 1 && gameStarted) {
                            ttt.playerOne(parseInt(typedCommand))
                            typing = false
                        }
                        else if (ttt.turn == 2 && gameStarted) {
                            ttt.playerTwo(parseInt(typedCommand))
                            typing = false
                        }
                        // check for win and end game if so exit game
                        if (ttt.winner) {
                            gameStarted = false
                            game = null
                            responseTypewriter.typeString('Exiting Tic-Tac-Toe...').start().then(() => typing = false)
                            ttt.end()
                            break
                        }
                        if (!gameStarted) {
                            responseTypewriter.typeString('Game not started!').start().then(() => typing = false)
                            break
                        }
                    default:
                        if (!gameStarted) {
                            responseTypewriter.typeString('Game not started!').start().then(() => typing = false)
                            break
                        } else if (parseInt(typedCommand) > 9 || parseInt(typedCommand) < 1 || Number.isNaN(parseInt(typedCommand)) || typedCommand == ' ') {
                            errorTypewriter.typeString('Invalid input. Enter an integer between 1 and 9. Or type "exit" to exit.').start().then(() => typing = false)
                        }
                }
            }
            else if (game === 'ascii') { }
            else if (game === 'hangman') { }

        }
        const handleInput = e => { // change display value to input value
            if (!typing) setInputText(e.target.value)
            else {
                e.preventDefault()
                e.target.value = ''
                setInputText('')
            }
        }
        const handleInputSelection = e => {
            const pos = consoleInputRef.current.selectionStart
            setCursorPos(pos)
        }
        const handleKeyDown = e => { // make sure to focus on input every time a key is pressed
            switch (e.key.toLowerCase()) {
                case 'arrowup':
                    e.preventDefault()
                    historyIndex = historyIndex - 1 < 0 && historyIndex != history.length ? history.length - 1 : historyIndex - 1
                    consoleInputRef.current.value = history[historyIndex]

                    consoleInputRef.current.dispatchEvent(new Event('input'))
                    break;
                case 'arrowdown':
                    e.preventDefault()
                    historyIndex = historyIndex + 1 > history.length - 1 ? 0 : historyIndex + 1
                    consoleInputRef.current.value = history[historyIndex]

                    consoleInputRef.current.dispatchEvent(new Event('input'))
                    break;
                case 'backspace':
                    if (!e.shiftKey && !e.ctrlKey) consoleInputRef.current.focus()
                    const pos = consoleInputRef.current.selectionStart != 0 ? consoleInputRef.current.selectionStart - 1 : 0
                    setCursorPos(pos)
                    break;
                case 'a':
                case 'b':
                case 'c':
                case 'd':
                case 'e':
                case 'f':
                case 'g':
                case 'h':
                case 'i':
                case 'j':
                case 'k':
                case 'l':
                case 'm':
                case 'n':
                case 'o':
                case 'p':
                case 'q':
                case 'r':
                case 's':
                case 't':
                case 'u':
                case 'v':
                case 'w':
                case 'x':
                case 'y':
                case 'z':
                case ' ':
                case 'enter':
                    if (!e.shiftKey && !e.ctrlKey) consoleInputRef.current.focus()
                    break;
                default:
                    break;
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        if (deviceType() !== 'desktop') {
            document.addEventListener('click', () => consoleInputRef.current.focus())
        }

        consoleInputRef.current.addEventListener('input', handleInput)
        document.addEventListener('selectionchange', handleInputSelection)

        consoleInputFormRef.current.addEventListener('submit', handleConsoleSubmit)
    }, [consoleDisplayRef.current && consoleInputDisplayRef.current && consoleInputRef.current]) // when all three refs are ready

    return (
        <>
            <Head>
                <title>Portfolio</title>
                <link rel="icon" href={`${FILE_PREFIX}/favicon.ico`} />
            </Head>
            <div className={styles.consoleDisplay} ref={consoleDisplayRef}></div>
            <div className={styles.consoleInputDisplay} ref={consoleInputDisplayRef}>
                {USER_TEXT}
                {
                    inputText
                }
                <span className={styles.caret} ref={caretRef}></span>
            </div>
            <form ref={consoleInputFormRef}
                spellCheck="false"
                autoCapitalize='off'
                autoComplete="off"
                autoCorrect="off"
            >
                <input type="text" className={styles.consoleInput} ref={consoleInputRef} name="command" />
            </form>
        </>
    )
}
