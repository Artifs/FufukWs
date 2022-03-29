import {Container,Row,Col } from 'react-bootstrap';
import React, { Component } from 'react'
import {withRouter} from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'


class ZakazPortretaSecond extends Component {
    constructor(props){
        super(props);
        this.state = {
            choosen: this.props.location.state.choosen,
            photoIsLoaded:false,
            imgUpload: '',
            textOnFileLoader:'Добавить фото',
            }
        this.getBase64 = this.getBase64.bind(this)
    }

    getBase64(e) {
        var file = e
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            console.log(reader.result)
          this.setState({
            imgUpload: reader.result
          })
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        }
      }


    isDisabled = (e) => {
        if (this.state.photoIsLoaded !== false ){
            return false
        }else{
            return true
        }
    }

    Filer = (e) => {
        const selectedFile = document.getElementById('fileInput').files[0];
        if (typeof selectedFile === 'undefined'){
            this.setState({
                textOnFileLoader:'Добавить фото',
                photoIsLoaded: false
            })
        }else{
            this.getBase64(selectedFile);
        }
        //console.log(selectedFile)
        if (typeof selectedFile !== 'undefined'){
            this.setState({
                textOnFileLoader:'Загрузка фото',
                file: selectedFile,
                photoIsLoaded: true
            })
            var form = new FormData()
            form.append('file', selectedFile);
            form.append('loadedimg', true);
            axios.post('http://g908020p.beget.tech', form)
            .then((response) => {
                console.log(response.data)
                if(response.data !== 'FileSoBig' && response.data !== 'badFormat' && response.data === 'LoadAccept'){
                    this.setState({
                        textOnFileLoader: 'Загрузка прошла успешно',
                        photoIsLoaded: true
                    })
                }else if(response.data !== 'FileSoBig' && response.data !== 'badFormat'){
                    this.setState({
                        textOnFileLoader: 'Неизвестная ошибка, обратитесь в тех. поддержку',
                        photoIsLoaded: false
                    })
                }else if(response.data === 'FileSoBig'){
                    this.setState({
                        textOnFileLoader: 'Слишком большое изображение',
                        photoIsLoaded: false
                    })
                }else{
                    this.setState({
                        textOnFileLoader: 'Неподходящий формат',
                        photoIsLoaded: false
                    })
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    textOnFileLoader:error,
                    photoIsLoaded: false
                });
            })
        }else{
            this.setState({
                textOnFileLoader:"Добавить фото",
                photoIsLoaded: false
            });
        }
    }
        
    
    render() {
        const location = {
            pathname: '/ZakazPortretaResult',
            state: {
                choosen: this.state.choosen,
                file: this.state.file,
                imgUpload: this.state.imgUpload
            }
        }
        return (
            <div className='MarginTop'>
                <h2 className='textSecond text-center' >Загрузите ваше изображение<br/>
                <span className='reqText' >Вес изображения не должен превышать 50 мб, также оно должно быть в одном из стандартных форматов: PNG, JPEG (JPG), если вам нужна помощь с выбором фотографии, прочитайте советы в разделе FAQ,<br/> если останутся сомнения, смело пишите в техническую поддержку, вам всегда будут рады. </span><br/></h2>
                
                <Container className = 'inputsPortrets'>
                <Row>
                    
                    <Col>   
                    <div className="example-1 fileInput">
                    <div className="form-group">
                        <label className="label">
                            <span className="title">{this.state.textOnFileLoader}</span>
                            <form encType="multipart/form-data">
                                <input type="file" id = 'fileInput'  name="path" onChange = {this.Filer}/>
                            </form>
                        </label>
                    </div>
                    </div>
                    <Link to={location}>
                        <button className='nextButtonZakaz mb-5' disabled = {this.isDisabled()}>Далее</button>
                    </Link> 
                    
                    </Col>
                    
                </Row>
                </Container>
            
            </div>
        )
    }
}

export default withRouter(ZakazPortretaSecond);