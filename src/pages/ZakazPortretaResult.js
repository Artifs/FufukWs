import React, { useState } from 'react'
import { UserContext } from "../App";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";


export default function ZakazPortretaResult(props) {
    const [choosen, setChoosen] = useState(props.location.state.choosen)
    const [imgUpload, setImgUpload] = useState(props.location.state.imgUpload)
    const [file, setFile] = useState(props.location.state.file)
    const [clicked, setClicked] = useState(false)
    const [addCart, setAddCart] = useState(false)
    const [price, setPrice] = useState(0)
    const alert = useAlert();
    const history = useHistory();
    
    const isDisabled = (e) => {
        if (clicked === true){
            return true
        }else{
            return false
        }
    }

    const HundleCheck = (e) => {
            setClicked(true)
            setAddCart(true)
            alert.success('Товар успешно добавлен в корзину');
            //history.push('/Cart')
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
                 <UserContext.Consumer>
                    {(value) =>{
                        if(addCart === true){
                            value.setUserCart((p) => ({ ...p, cart:[ ...value.userCart.cart , [999 ,choosen , price,1]] }))
                            value.setFilesPortret((p) => ({ ...p, filesPortret:[ ...value.filesPortret.filesPortret , [file, choosen]] }))
                            setAddCart(false)
                        }
                    }
                } 
                </UserContext.Consumer>
                <h2 className='textSecond text-center' >Подтвердите формат и изображение портрета</h2>
                <h5 className='mb-5 text-center'>
                    <button className='nextButtonZakaz mt-3' disabled = {isDisabled()} onClick={HundleCheck}>Добавить в корзину</button>
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



