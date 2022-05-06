import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from "../App";
import { useAlert } from "react-alert";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";

export default function ZakazPortretaResult(props) {
    const [choosen, setChoosen] = useState(props.location.state.choosen)
    const [imgUpload, setImgUpload] = useState(props.location.state.imgUpload)
    const [file, setFile] = useState(props.location.state.file)
    const { portretCash, setPortretCash } = useContext(UserContext)
    const { filesPortret, setFilesPortret } = useContext(UserContext)

    const [addCart, setAddCart] = useState(false)
    const [price, setPrice] = useState(0)
    const alert = useAlert();
    const history = useHistory();

    useEffect(() => {
        if (choosen != 2 && choosen != 3 && choosen != 4){
            history.push ('/')
        }

    }, [])

    console.log(file)
    const HundleCheck = (e) => {
            setAddCart(true)

            setPortretCash((p) => ({ CashPortret:[choosen , price] }))
            setFilesPortret((p) => ({ filesPortret:[file, imgUpload] }))
        }
        if (price === 0 && choosen === 4){
            setPrice(1500)
        }else if (choosen === 3 && price === 0){
            setPrice(2000)
        }else if (choosen === 2  && price === 0){
            setPrice(3000)
        }
        return (
            <div className="mb-5 MarginTop" >
                <h2 className='textSecond text-center' >Подтвердите формат и изображение портрета</h2>
                <h5 className='mb-5 text-center'>
                    <LinkContainer to='/ZakazPortretaOformlenie'>
                        <button className='nextButtonZakaz mt-3'  onClick={HundleCheck}>Перейти к оформлению</button>
                    </LinkContainer>
                    </h5>
                    <h4 className='text-center'>
                        <table >
                                <td>Формат портрета:</td> <td>A{choosen}</td> 
                        </table>
                        <br/>
                        Ваше изображение:<br/><br/>
                        <img src = {imgUpload} className = "imgOrig" />
                    </h4>
            </div>
        )
    }



