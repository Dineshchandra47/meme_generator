import { useState, useEffect } from "react";
import { saveAs } from "file-saver";

const Memes = () => {
    const [allMemes, setAllMemes] = useState([])
    const [currMeme, setCurrMeme] = useState({
        randomImage: "https://i.imgflip.com/30b1gx.jpg",
        id: 181913649,
        index: 0,
        name: "Drake Hotline Bling"
    });

    const [captions, setCaptions] = useState([]);
    
    function getRandomMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        const id = allMemes[randomNumber].id
        const name = allMemes[randomNumber].name
        setCurrMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url,
            id: id,
            index: randomNumber,
            name: name
        }))
    }

    const handleChange = (e, index) => {
        const text = e.target.value || '';
        setCaptions(
            captions.map((c,i) => {
                if(index === i) {
                    return text;
                }else {
                    return c;
                }
            })
        )
     }

    const saveFile = () => {
        saveAs(
            currMeme.randomImage,
            `${currMeme.name}.jpg`
        );
    };

    const generateMeme = () => {
        const formData = new FormData();
        formData.append('username','sorrymybad');
        formData.append('password','Jay12345');
        formData.append('template_id',currMeme.id);
        captions.forEach((c,index) => formData.append(`boxes[${index}][text]`,c));

        fetch('https://api.imgflip.com/caption_image',{
            method:'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                const url = data.data.url;
                setCurrMeme(prevMeme => ({
                    ...prevMeme,
                    randomImage: url,
                }))
            })
    }

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => {
                console.log(data.data.memes)
                setAllMemes(data.data.memes)
            })
    }, [])

    useEffect(() => {
        if(allMemes.length){
            setCaptions(Array(allMemes[currMeme.index].box_count).fill(''));
        }
    },[currMeme, allMemes]);

    return (
        (allMemes.length ? (
            <div className="max-w-xl mx-auto p-9 lg:max-w-full lg:flex md:justify-evenly lg:items-center">
            <div className="grid max-w-xl grid-cols-2 gap-4 grid-rows">
                {captions.map((c,index) => (
                    <input 
                    className="col-span-2 input" 
                    type="text" 
                    placeholder="Text"
                    name="memecaption"
                    key={index}
                    onChange={(e) => handleChange(e,index)}
                    value={c}
                    />
                ))}
                <button className="col-span-2 bg-gradient-to-r from-[#1B98F5] to-[#5DA3FA] text-white font-[Karla] font-bold text-xl rounded-md p-[0.625rem]" onClick={getRandomMemeImage}>
                    Get a new meme image 🖼️
                </button>
                <button className="col-span-2 bg-gradient-to-r from-[#1B98F5] to-[#5DA3FA] text-white font-[Karla] font-bold text-xl rounded-md p-[0.625rem]" onClick={generateMeme}>
                    Generate Meme
                </button>
            </div>
            <div className="mt-9">
                <img src={currMeme.randomImage} alt="meme" className="max-w-full m-auto rounded-md lg:max-w-lg"/>
            </div>
            <div className="flex justify-center mt-4">
                <button className="bg-gradient-to-r from-[#1B98F5] to-[#5DA3FA] text-white font-[Karla] font-bold text-xl rounded-md p-[0.625rem] max-w-xl" onClick={saveFile}>
                        Download Image
                </button>
            </div>
        </div>
        ): <></>)
        
    )
}

export default Memes;