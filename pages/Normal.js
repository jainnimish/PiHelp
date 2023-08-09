import { useState } from "react"
import Image from "next/image"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import styles from "../styles/Normal.module.css"
import Head from "next/head"

export default function Normal() 
{
  const MySwal = withReactContent(Swal) 
  const [filename, setFilename] = useState("/4_33.svg")
  const [val, setVal] = useState("")  
  const [correct, setCorrect] = useState(0)

  function handleSubmit(event)
  {
    event.preventDefault()
    fetch(filename.replace("svg", "json")).then((res) => res.json()).then((data) => {
      const ans = data.answer
      const lenAns = ans.length
      const lenVal = val.length

      if(ans === val)
      {
        MySwal.fire({
          icon: "success",
          title: "YAY!",
          text: "Great Job! You got it 🎉",
          iconColor: "green"
        })
        
        var file = randomChooser()
        setFilename(file)
        setVal("")
        setCorrect(correct + 1)
      }

      else if(lenAns !== lenVal)
      {
        var txt = null
        if(lenVal > lenAns)
        {
          txt = `Your input contains ${lenVal - lenAns} letter(s) more than the answer.`
        }

        else 
        {
          txt = `Your input contains ${lenAns - lenVal} letter(s) less than the answer.`
        }

        MySwal.fire({
          icon: "warning",
          title: "YIKES",
          text: txt,
        })
      }

      else
      {
        var difference = [];
        for (let i = 0; i < ans.length; i++) 
        {
          if(val[i] !== ans[i])
          {
            difference.push((i + 1).toString())
          }
        }

        const lines = difference.join(", ");

        MySwal.fire({
          icon: "error",
          title: "OOPS...",
          text: `You got it wrong. All the wrong characters are located on lines ${lines}. Please try again.`,
        })
      }
    })
  }


  return (
    <div>
      <Head>
        <title>PiHelp</title>
      </Head>
      <div className={styles.piano}>
        <Image src={filename} width="1400" height="500"/>
      </div>
      <form onSubmit={handleSubmit}> 
        <input placeholder="Enter answer" className={styles.input} type="text" value={val} onChange={() => setVal(event.target.value)} />
        <input className={styles.submit} type="submit" value="Submit" />
      </form>
      <div>
        <p className={styles.correct}>{correct}</p>
      </div>
    </div>
    )
}


function randomChooser(){
    const beats = ["3", "4", "6"]
    var random_beat = beats[Math.floor(Math.random() * beats.length)]
    var num = null

    switch (random_beat) 
    {
        case "3":
            num = Math.floor(Math.random() * 251 + 1)
            break;
        case "4":
            num = Math.floor(Math.random() * 651 + 1)
            break;
        case "6":
            num = Math.floor(Math.random() * 101 + 1)
            break;
    }

    var file = "/".concat(random_beat).concat("_").concat(num.toString()).concat(".svg")
    return file
}
