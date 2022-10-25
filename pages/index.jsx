import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import RockPaperScissors from '../lib/games/RockPaperScissors'
import TicTacToe from '../lib/games/TicTacToe'
import Typewriter from '../lib/Typewriter'
import { deviceType, BASE_PREFIX } from '../lib/util/util'
import styles from '../styles/Home.module.css'
import { faker } from '@faker-js/faker'

const USER_TEXT = 'C:\\Users\\Aarush\\Portfolio>' + ' '
const CHAR_WIDTH = 8.1879
const ASCII_ART_SPEED = 0
const CONTACT_INFO = {
    email: 'aarushnarang@gmail.com',
    github: 'https://github.com/aarush-narang',
    linkedin: 'https://www.linkedin.com/in/aarush-narang',
    instagram: 'https://www.instagram.com/aarushnarang_/',
    host: 'https://aarush-narang.github.io/portfolio'
}

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

        // Initial Ascii Art
        // const mainTypewriter1 = new Typewriter(consoleDisplayRef.current, { typingSpeed: ASCII_ART_SPEED, className: styles.asciiStartClass1 })
        const mainTypewriter2 = new Typewriter(consoleDisplayRef.current, { typingSpeed: ASCII_ART_SPEED, className: styles.asciiStartClass2 })
        const mainTypewriter3 = new Typewriter(consoleDisplayRef.current, { typingSpeed: ASCII_ART_SPEED, className: styles.asciiStartClass3 })
        const infoTypewriter = new Typewriter(consoleDisplayRef.current, { typingSpeed: 3, className: styles.warnClass })

        // mainTypewriter1.typeString(`
        //                      *       *             *         ..-. *   .    *
        //                    .         *   *    .-. *  .  _  _/ ^  \\   _   .   *
        //                          *           /   \\     (( / ^    ^\\_/ \\       *  .
        //                         _    .   .--'\\/\\_ \\     \`/ \`-._    /  ^\\  *  .-.
        //                     *  / \\_  ___/ ^     ^\\/\\'__ /  ____   /\\   /\\  _/  ^\\ *
        //                       /    \\/ _/__________\\________|  |_____  / .\`/    ./^\\  .
        //                  .   /\\/\\  / /______________________________\\ \\  /\\    /   \\
        //                     /    \\/ /________________________________\\ \\/^ \\/\\/    ^\\
        //                   /\\  .-  \\   ||___|___||||||||||||___|__|||   /^-._        ^\\
        //                  /  \`-.__ ^\\  ||___|___||||||   |||___|__|||  /     \`._    _.\`\\
        //                 /        \`. \\ |||||||||||||||\`  |||||||||||| /            \`    \\
        //                 ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
        //                                              /|\\
        //                                             / | \\
        //                                            /  |  \\
        //                                           /   |   \\
        //                                          /    |    \\
        //                                         /     |     \\
        //                                        /      |      \\`).start()
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
        `).start().then(() => {
            infoTypewriter.pauseFor(200).typeString('Welcome to my Portfolio! Type "help" to see a list of commands.').start()
        })

        // Initialize Games
        const ttt = new TicTacToe(consoleDisplayRef.current)
        const rps = new RockPaperScissors(consoleDisplayRef.current)

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

            const responseTypewriter = new Typewriter(consoleDisplayRef.current, { typingSpeed: 10, className: styles.responseClass })
            const commands = ['help', 'projects', 'about', 'contact', 'contact <social>', 'source', 'ping', 'clear', 'reload', 'exit', '+ other secret commands :)\n\n(Hint: try "ttt" or "hack")']

            const errTypewriter = new Typewriter(consoleDisplayRef.current, { typingSpeed: 25, className: styles.errClass })

            // command handlers & game handlers
            if (!game) {
                switch (typedCommand.toLowerCase()) {
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
                    case 'close':
                    case 'exit':
                        errTypewriter.typeString('Closing console...')
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
                        }, 1000)
                        break;
                    case 'reload':
                        errTypewriter.typeString('Reloading console...')
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
                            window.location.reload()
                        }, 1000)
                        break;
                    case 'projects':
                        responseTypewriter.typeString('Fetching Projects...')
                            .deleteChars(3)
                            .typeString('...')
                            .deleteChars(3)
                            .typeString('...')
                            .deleteChars(3)
                            .typeString('...')
                            .deleteChars(3)
                            .typeString('...')
                            .start().then(() => typing = false)

                        const repositoriesJSON = await fetch('https://api.github.com/users/aarush-narang/repos').then(res => res.json()).catch(() => {
                            responseTypewriter.typeString('Unable to fetch.').start()
                            typing = false
                            return null
                        })

                        if (repositoriesJSON == null) break;

                        const repositories = await Promise.all(await repositoriesJSON.map(async repo => {
                            const languagesJSON = await fetch(`https://api.github.com/repos/aarush-narang/${repo.name}/languages`).then(res => res.json()).catch(() => {
                                responseTypewriter.typeString('Unable to fetch.').start()
                                typing = false
                                return null
                            })
                            return {
                                name: repo.full_name,
                                url: repo.html_url,
                                description: repo.description ? repo.description : 'No description provided.',
                                fork: repo.fork,
                                languages: Object.keys(languagesJSON).length ? Object.keys(languagesJSON).join(', ') : 'No languages.'
                            }
                        }))

                        if (repositories == null || repositories.includes(null)) break;

                        setTimeout(async () => {
                            for (const repo of repositories) {
                                const nameTypewriter = new Typewriter(consoleDisplayRef.current, { typingSpeed: 0, className: styles.nameClass })
                                const urlTypewriter = new Typewriter(consoleDisplayRef.current, { typingSpeed: 1, className: styles.urlClass })
                                const descriptionTypewriter = new Typewriter(consoleDisplayRef.current, { typingSpeed: 0, className: styles.descriptionClass })
                                const languagesTypewriter = new Typewriter(consoleDisplayRef.current, { typingSpeed: 1, className: styles.languagesClass })

                                await nameTypewriter.typeString(`${repo.name}${repo.fork ? ' (forked)' : ''}`).start()
                                await descriptionTypewriter.typeString(`${repo.description}`).start()
                                await languagesTypewriter.typeString(`${repo.languages}`).start()
                                await urlTypewriter.typeString(`${repo.url}`).start()
                            }
                            typing = false
                        }, 1000)

                        break;
                    case 'about':
                        responseTypewriter
                            .typeString('I am 16 years old and am passionate about building beautiful, responsive websites and applications.\n')
                            .typeString('I have a passion for learning new technologies and constantly learning new things.\n')
                            .typeString('I am currently a student at Lynbrook High School.\n\n')
                            .typeString('You can find my projects by running the "projects" command and you can find my contact information by running the "contact" command.\n')
                            .typeString('I am proficient in HTML, CSS, Javascript, and Python. I have used frameworks such as React/NextJS, Flask. And I have used MongoDB in several projects as well as experimented with MySQL/SQL based databases.\n')
                            .typeString('I am currently working on a messaging app using NextJS and MongoDB\n')
                            .start().then(() => typing = false)
                        break;
                    case 'contact':
                        responseTypewriter
                            .typeString(`Email: ${CONTACT_INFO.email}\n`)
                            .pauseFor(100)
                            .typeString(`Instagram: ${CONTACT_INFO.instagram}\n`)
                            .pauseFor(100)
                            .typeString(`GitHub: ${CONTACT_INFO.github}\n`)
                            .pauseFor(100)
                            .typeString(`LinkedIn: ${CONTACT_INFO.linkedin}\n\n\n`)
                            .pauseFor(100)
                            .typeString(`Type "contact (email/github/etc.)" to open`)
                            .start().then(() => typing = false)
                        break;
                    case 'contact email':
                        responseTypewriter.typeString('Opening...')
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
                            window.open(`mailto:${CONTACT_INFO.email}`)
                        }, 1000);
                        break
                    case 'contact github':
                        responseTypewriter.typeString('Opening...')
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
                            window.open(CONTACT_INFO.github)
                        }, 1000);
                        break
                    case 'contact linkedin':
                        responseTypewriter.typeString('Opening...')
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
                            window.open(CONTACT_INFO.linkedin)
                        }, 1000);
                        break
                    case 'contact instagram':
                        responseTypewriter.typeString('Opening...')
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
                            window.open(CONTACT_INFO.instagram)
                        }, 1000);
                        break
                    case 'source':
                        responseTypewriter.typeString('Opening...')
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
                            window.open(`${CONTACT_INFO.github}/portfolio`)
                        }, 1000);
                        break
                    case 'ping':
                        const start = Date.now()
                        const ping = await fetch(CONTACT_INFO.host, {
                            mode: 'no-cors'
                        }).then(() => {
                            return Date.now() - start
                        }).catch(() => {
                            responseTypewriter.typeString(`Unable to ping.`).start().then(() => typing = false)
                            return null
                        })
                        if (ping != null) responseTypewriter.typeString(`Pong! ${ping}ms`).start().then(() => typing = false)
                        break;
                    // secret commands
                    case 'ttt':
                        responseTypewriter
                            .typeString('Welcome to Tic-Tac-Toe! Type "start" to start. Or type "exit" to exit at anytime.')
                            .start().then(() => typing = false)
                        game = 'ttt'
                        break;
                    case 'rps':
                        responseTypewriter
                            .typeString('Welcome to Rock Paper Scissors! Type "start" to start. Or type "exit" to exit at anytime.')
                            .start().then(() => typing = false)
                        game = 'rps'
                        break;
                    case 'hack':
                        const randomCardIssuer = faker.finance.creditCardIssuer()
                        const name = {
                            firstName: faker.name.firstName(),
                            lastName: faker.name.lastName(),
                        }
                        const randomDetails = {
                            // bank details
                            name: 'Bank of America',
                            account: faker.finance.account(),
                            routing: faker.finance.routingNumber(),
                            accountName: faker.finance.accountName(),
                            balance: faker.finance.amount(0, 1000000, 2, '$'),
                            cardNumber: faker.finance.creditCardNumber(randomCardIssuer),
                            cardCVV: faker.finance.creditCardCVV(),
                            cardExpiration: faker.date.future(3, new Date()).toLocaleDateString(),
                            cardIssuer: randomCardIssuer,
                            // crypto details
                            btcAddress: faker.finance.bitcoinAddress(),
                            ethAddress: faker.finance.ethereumAddress(),

                            // other details
                            firstName: name.firstName,
                            lastName: name.lastName,
                            job: `${faker.name.jobArea()} ${faker.name.jobType()}: ${faker.name.jobTitle()}`,
                            address: faker.address.streetAddress(),
                            email: faker.internet.email(name.firstName, name.lastName),
                            phone: faker.phone.number('+# (###) ###-####'),
                            phoneImei: faker.phone.imei(),
                        }
                        // random hack messages
                        responseTypewriter
                            .typeString('Starting hack...')
                            .deleteChars(3)
                            .typeString('...')
                            .deleteChars(3)
                            .typeString('...')
                            .deleteChars(3)
                            .typeString('...\n\n')
                            .pauseFor(200)
                            .typeString('Grabbing Info...')
                            .pauseFor(1000)
                            .deleteChars(16)
                            .typeString(`IP: ${faker.internet.ip()}\n`)
                            .pauseFor(100)
                            .typeString(`User Agent: ${faker.internet.userAgent()}\n`)
                            .pauseFor(300)
                            .typeString('Grabbing location...')
                            .pauseFor(1000)
                            .deleteChars(20)
                            .typeString(`Location: ${faker.address.city()}, ${faker.address.stateAbbr()}\n`)
                            .pauseFor(300)
                            .typeString('Grabbing financial details...')
                            .pauseFor(3000)
                            .deleteChars(29)
                            .typeString('Bank: Bank of America\n')
                            .pauseFor(100)
                            .typeString(`Account: ${randomDetails.account}\n`)
                            .pauseFor(100)
                            .typeString(`Routing: ${randomDetails.routing}\n`)
                            .pauseFor(100)
                            .typeString(`Account Name: ${randomDetails.accountName}\n`)
                            .pauseFor(100)
                            .typeString(`Balance: ${randomDetails.balance}\n`)
                            .pauseFor(100)
                            .typeString(`Card Number: ${randomDetails.cardNumber}\n`)
                            .pauseFor(100)
                            .typeString(`Card CVV: ${randomDetails.cardCVV}\n`)
                            .pauseFor(100)
                            .typeString(`Card Expiration: ${randomDetails.cardExpiration}\n`)
                            .pauseFor(100)
                            .typeString(`Card Issuer: ${randomDetails.cardIssuer}\n`)
                            .pauseFor(1000)
                            .typeString(`Bitcoin Address: ${randomDetails.btcAddress}\n`)
                            .pauseFor(100)
                            .typeString(`Ethereum Address: ${randomDetails.ethAddress}\n`)
                            .pauseFor(500)
                            .typeString('Grabbing other details...')
                            .pauseFor(2000)
                            .deleteChars(25)
                            .typeString(`First Name: ${randomDetails.firstName}\n`)
                            .pauseFor(100)
                            .typeString(`Last Name: ${randomDetails.lastName}\n`)
                            .pauseFor(100)
                            .typeString(`Job: ${randomDetails.job}\n`)
                            .pauseFor(100)
                            .typeString(`Address: ${randomDetails.address}\n`)
                            .pauseFor(100)
                            .typeString(`Email: ${randomDetails.email}\n`)
                            .pauseFor(100)
                            .typeString(`Phone: ${randomDetails.phone}\n`)
                            .pauseFor(100)
                            .typeString(`Phone IMEI: ${randomDetails.phoneImei}\n\n`)
                            .pauseFor(1000)
                            .typeString('Hack complete.')
                            .start()
                            .then(() => typing = false)
                        break
                    case '':
                        typing = false
                        break;
                    default:
                        responseTypewriter.typeString('Command not found').start().then(() => typing = false)
                        break;
                }
            }
            else if (game === 'ttt') {
                if (!gameStarted && typedCommand !== 'start') {
                    return responseTypewriter.typeString('Game not started!').start().then(() => typing = false)
                }
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
                    default:
                        if (parseInt(typedCommand) > 9 || parseInt(typedCommand) < 1 || Number.isNaN(parseInt(typedCommand)) || typedCommand == ' ') {
                            errorTypewriter.typeString('Invalid input. Enter an integer between 1 and 9. Or type "exit" to exit.').start().then(() => typing = false)
                        }
                }
            }
            else if (game === 'rps') {
                if (!gameStarted && typedCommand !== 'start') {
                    return responseTypewriter.typeString('Game not started!').start().then(() => typing = false)
                }
                const errorTypewriter = new Typewriter(consoleDisplayRef.current, { typingSpeed: 1, className: styles.errClass })
                const promptTypewriter = new Typewriter(consoleDisplayRef.current, { typingSpeed: 1, className: styles.promptClass })
                if (typedCommand.toLowerCase() !== 'start' && typedCommand.toLowerCase() !== 'exit') {
                    if (!rps.bestOf && (parseInt(typedCommand) < 1 || parseInt(typedCommand) > 9 || Number.isNaN(parseInt(typedCommand)) || parseInt(typedCommand) % 2 === 0)) {
                        return errorTypewriter.typeString('Please enter a number. (1-9, odd number)').start().then(() => typing = false)
                    } else if (!rps.bestOf) {
                        rps.setBestOf = parseInt(typedCommand)
                        return promptTypewriter.typeString(`Ok, best of ${rps.bestOf} round${rps.bestOf == 1 ? '' : 's'}.\n\n`)
                            .pauseFor(100)
                            .typeString('What difficulty would you like to play at? (Enter 1 - 4, or 5 which is random)')
                            .start().then(() => typing = false)
                    }

                    if (!rps.difficulty && (parseInt(typedCommand) > 5 || parseInt(typedCommand) < 1 || Number.isNaN(parseInt(typedCommand)))) {
                        return errorTypewriter.typeString('Please enter a number. (1 - 4, or 5 which is random)').start().then(() => typing = false)
                    } else if (!rps.difficulty) {
                        rps.setDifficulty = parseInt(typedCommand)
                        return promptTypewriter.typeString(`Ok, difficulty set to ${rps.difficulty}.\n\n`)
                            .pauseFor(100)
                            .typeString('Starting game...')
                            .start().then(() => typing = false)
                            .then(() => {
                                rps.promptPlayer()
                            })
                    }
                }

                switch (typedCommand.toLowerCase()) {
                    case 'exit':
                        errorTypewriter.typeString('Exiting Rock Paper Scissors...').start().then(() => typing = false)
                        game = null
                        gameStarted = false
                        rps.end()
                        break;
                    case 'start':
                        if (gameStarted) {
                            responseTypewriter.typeString('Game already started!').start().then(() => typing = false)
                            break
                        }
                        responseTypewriter.typeString('Starting Rock Paper Scissors...').start().then(() => typing = false)
                        rps.start()
                        gameStarted = true
                        break;
                    case 'rock':
                    case 'r':
                        await rps.setPlayer('rock')
                        typing = false
                        break;
                    case 'paper':
                    case 'p':
                        await rps.setPlayer('paper')
                        typing = false
                        break;
                    case 'scissors':
                    case 's':
                        await rps.setPlayer('scissors')
                        typing = false
                        break
                    case 'score':
                        rps.getScore()
                        typing = false
                        break
                    default:
                        if (!['rock', 'r', 'paper', 'p', 'scissors', 's'].includes(typedCommand.toLowerCase())) {
                            errorTypewriter.typeString('Invalid input.').start().then(() => typing = false)
                        }
                }

                if (rps.winner) {
                    gameStarted = false
                    game = null
                    errTypewriter.typeString('Exiting Rock Paper Scissors...').start().then(() => typing = false)
                    rps.end()
                }
            }
        }

        // Other events
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
                    setCursorPos(history[historyIndex].length)

                    consoleInputRef.current.dispatchEvent(new Event('input'))
                    break;
                case 'arrowdown':
                    e.preventDefault()
                    historyIndex = historyIndex + 1 > history.length - 1 ? 0 : historyIndex + 1
                    consoleInputRef.current.value = history[historyIndex]
                    setCursorPos(history[historyIndex].length)

                    consoleInputRef.current.dispatchEvent(new Event('input'))
                    break;
                case 'backspace':
                    const pos = consoleInputRef.current.selectionStart != 0 ? consoleInputRef.current.selectionStart - 1 : 0
                    setCursorPos(pos)
                    break;
                default:
                    if (!e.shiftKey && !e.ctrlKey) consoleInputRef.current.focus()
                    break;
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        if (deviceType() !== 'desktop') {
            document.addEventListener('click', () => consoleInputRef.current.focus()) // For mobile devices, focus on tap
        }

        consoleInputRef.current.addEventListener('input', handleInput)
        document.addEventListener('selectionchange', handleInputSelection)

        consoleInputFormRef.current.addEventListener('submit', handleConsoleSubmit)
    }, [consoleDisplayRef.current && consoleInputDisplayRef.current && consoleInputRef.current])

    return (
        <>
            <Head>
                <title>Portfolio</title>
                <link rel="icon" href={`${BASE_PREFIX}/favicon.ico`} />
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
