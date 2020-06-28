import React from 'react';
import './UploadModal.scss'
import clip from '../../assets/clip.svg'

var categories = require('../../categories/categories.json');

class UploadModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            error: false,
            title: '',
            category: '0',
            poster: ''

        }
        this.getUrl = this.getUrl.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.handleTitle = this.handleTitle.bind(this);

    }
    handleTitle(event) {
        this.setState({title: event.target.value})
    }
   
    selectCategory(event) {
        this.setState({category: event.target.value})

    }
    handleDragOver(event) { 
        event.preventDefault();
        console.log('draggin');
        console.log(categories);
    }
    handleDrop(event) {
        console.log('File(s) dropped');
        event.preventDefault();
        if (event.dataTransfer.items) {
              if (event.dataTransfer.items[0].kind === 'file') {
                var file = event.dataTransfer.items[0].getAsFile();
                this.getUrl(file);
              }
          } else {
                this.getUrl(event.dataTransfer.files[0]);
          }
          this.cleanData(event);
    }
    cleanData(event){
        if (event.dataTransfer.items) {
            event.dataTransfer.items.clear();
          } else {
            event.dataTransfer.clearData();
          }
    }
    getUrl(file) {    
        var reader = new FileReader();
                reader.onload =  event => {
                   this.setState({poster: event.target.result})
                };
                reader.readAsDataURL(file);    
    }
    render() {
        return(
            <div className='modal-main-container' onDragOver={this.handleDragOver} >
                <div className='modal-back-overlay' onClick={this.props.closeModal}></div>
                <div className= 'modal'>
                    <div className='add-file' onDrop={this.handleDrop} onDragOver={this.handleDragOver}>
                        <label for="addFile">
                            <img src={clip} alt='paperclip' />
                            <p>Agregar archivo <span>o arrastrarlo y soltarlo aquí</span></p>
                        </label>
                        <input type="file" id="addFile" ref={this.fileInput} onChange={event => this.getUrl(event.target.files[0])} accept="image/*" />
                        <div className='movieInputs'>
                            <input type='text' value={this.state.title} onChange={this.handleTitle} placeholder='Escribe el título'/>
                            <select value={this.state.category} onChange={this.selectCategory}>
                                <option disabled value='0'>Selecciona una</option>
                                {
                                    categories.genres.map(
                                        cat => <option value={cat.id}>{cat.name}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadModal;