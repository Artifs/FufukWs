import React, { Component } from 'react'
import {withRouter} from 'react-router'
import { UserContext } from "../App";

class ZakazPortretaResult extends Component {
    constructor(props){
        super(props);
        this.state = {
            choosen: this.props.location.state.choosen,
            imgUpload: this.props.location.state.imgUpload,
            file: this.props.location.state.file,
            email:'',
            clicked: false,
            addCart:false,
            price: 0
        }
        this.HundleCheck = this.HundleCheck.bind(this);
    }
    isDisabled = (e) => {
        if (this.state.clicked === true){
            return true
        }else{
            return false
        }
    }

        HundleCheck = (e) => {
            this.setState({clicked:true,addCart:true});
        }
    render() {
        if (this.state.price === 0 && this.state.choosen === 4){
            this.setState({price:1500})
        }else if (this.state.choosen === 3 && this.state.price === 0){
            this.setState({price:2000})
        }else if (this.state.choosen === 2  && this.state.price === 0){
            this.setState({price:3000})
        }
        return (
            <div className="mb-5 MarginTop" >
                 <UserContext.Consumer>
                    {(value) =>{
                        if(this.state.addCart === true){
                            value.setUserCart((p) => ({ ...p, cart:[ ...value.userCart.cart , ['Портрет A'+this.state.choosen , 1, this.state.price]] }))
                            value.setFilesPortret((p) => ({ ...p, filesPortret:[ ...value.filesPortret.filesPortret , [this.state.file, this.state.choosen]] }))
                            this.setState({addCart:false});
                        }
                    }
                } 
                </UserContext.Consumer>
                <h2 className='textSecond text-center' >Подтвердите формат и изображение портрета</h2>
                <h5 className='mb-5 text-center'>
                    <button className='nextButtonZakaz mt-3' disabled = {this.isDisabled()} onClick={this.HundleCheck}>Добавить в корзину</button>
                    </h5>
                    <h4 className='text-center'>
                        <table >
                                <td>Формат портрета:</td> <td>A{this.state.choosen}</td> 
                        </table>
                        <br/>
                        Ваше изображение:<br/><br/>
                        <img src = {this.state.imgUpload} className = "imgOrig" />
                    </h4>
            </div>
        )
    }
}


export default withRouter(ZakazPortretaResult);