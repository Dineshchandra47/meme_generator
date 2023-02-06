import logo from "../assets/Logo.png";

const Header = () => {
    return (
        <div className="flex flex-row p-5 justify-center items-center bg-gradient-to-r from-[#1B98F5] to-[#5DA3FA] text-white">
            <div className="flex items-center justify-center">
                <img className="w-8 mr-2" src={logo} alt="meme generator"/>
                <p>Meme Generator</p>
            </div>
        </div>
    )
}

export default Header;