import React from 'react';
import './UploadModal.scss'
import clip from '../../assets/clip.svg'
import logo from '../../assets/liteflix.svg'

var categories = require('../../categories/categories.json');

class UploadModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fakeProgress: 0,
            loaded: false,
            error: false,
            errorType: '',
            title: '',
            category: 0,
            poster: '',
            fileName: '',
            catsOpen: false   
        }
        this.getUrl = this.getUrl.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.openCategories = this.openCategories.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.uploadnewMovie = this.uploadnewMovie.bind(this);
        this.retry =this.retry.bind(this);
        this.fakeProgress = this.fakeProgress.bind(this);
        this.cancelLoad = this.cancelLoad.bind(this);

    }
    componentDidMount() {
        const select = document.getElementById('category-select');
        window.addEventListener('click',  event => {
            if (!select.contains(event.target)) {
                select.classList.remove('open');
            }
        }); // to close custom movie category select when you click outside the options
    }
    handleTitle(event) {
        this.setState({title: event.target.value})
    }
    handleDragOver(event) { 
        event.preventDefault();
        console.log('draggin');
    }
    handleDrop(event) {
        event.preventDefault();
        if (event.dataTransfer.items) {
              if (event.dataTransfer.items[0].kind === 'file' ) {
                var file = event.dataTransfer.items[0].getAsFile();
                if(file.type === 'image/jpeg' || file.type === 'image/png') {

                    this.getUrl(file);
                }
                else {
                    this.setState({
                        error: true,
                        errorType: '(Archivo inválido)'
                    });
                }
              }
          } else {
                if(event.dataTransfer.files[0].type === 'image/jpeg' || event.dataTransfer.files[0].type === 'image/png') {

                    this.getUrl(event.dataTransfer.files[0]);
                }
                else {
                    this.setState({
                        error: true,
                        errorType: '(Archivo inválido)'
                    });
                }
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
        if(file.size > 1000000){
            this.setState({
                error: true,
                errorType: '(Máximo 1 Mb)'
            });
        }
        else {
                if(file.type === 'image/jpeg' || file.type === 'image/png') {
                    this.fakeProgress();
                    var reader = new FileReader();
                    reader.onload =  event => {
                        this.setState({poster: event.target.result})
                    };
                    reader.readAsDataURL(file);
                    this.setState({
                        fileName: file.name,
                        loaded: true
                    })   
                }
                else {
                    this.setState({
                        error: true,
                        errorType: '(Archivo inválido)'
                    });
                }
        }
    }
    openCategories() {
        if(!this.state.catsOpen) {
            document.getElementById('category-select').classList.add('open');
            this.setState({catsOpen: true});
        }
        else {
            document.getElementById('category-select').classList.remove('open');
            this.setState({catsOpen: false});
        }
    }
    selectCategory(event){
        this.setState({category: parseInt(event.target.dataset.value)});
        document.getElementById('actual-selection').textContent = event.target.textContent;
    }
    uploadnewMovie() {
        this.setState({uploaded: true});
        this.props.addNewMovie(this.state.poster, this.state.title, this.state.category)
    }
    retry() {
        this.setState({error: false});
    }
    fakeProgress() {
        
        var count = 0;
        
        var countFunction = () => {
            window.inc = setInterval(timer, 20);
        }
        
        var timer =  () => {
              if (count >= 100) {
                   clearInterval(window.inc);
               }
               else {
                   count += 1;
                   this.setState(state =>({
                        fakeProgress: count
                   })) 
               }
       } 
       countFunction();   
    }
    cancelLoad() {
        clearInterval(window.inc);
        this.setState({
            fileName: '',
            poster: '',
            fakeProgress: 0,
            loaded: false
        })
    }
    render() {
        var fullMovieSpecs = (this.state.category > 0 && this.state.title !== '' && this.state.poster !== '' && this.state.fakeProgress >= 100)
        const progress = { width: ''+ this.state.fakeProgress +'%'}
        return(
            <div className='modal-main-container' onDragOver={this.handleDragOver} >
                <div className='modal-back-overlay' onClick={this.props.closeModal}></div>
                {   !this.state.uploaded
                    ?
                    <div className= 'modal'>
                        <div className='close-x' onClick={this.props.closeModal} >x</div>
                        {
                            this.state.error
                            ?
                            <div className='load-file' >
                                <div className='load-text'>
                                    <p><span>Error!</span> No se pudo cargar la película <span>{this.state.errorType}</span></p>
                                </div>
                                <div className='bar error-bar'></div>
                                <div className='load-button' onClick={this.retry}>
                                    <p>Reintentar</p>
                                </div>   
                            </div>
                            : !this.state.loaded
                            ?
                            <div className='add-file' onDrop={this.handleDrop} onDragOver={this.handleDragOver}>
                                <label htmlFor="addFile" className='fake-input-file'>
                                    <img src={clip} alt='paperclip' />
                                    <p>Agregar archivo <span>o arrastrarlo y soltarlo aquí</span></p>
                                </label>
                                <input type="file" id="addFile" ref={this.fileInput} onChange={event => this.getUrl(event.target.files[0])} accept="image/*" />
                            </div>
                            :
                            <div className='load-file' >
                                <div className='load-text'>
                                    {
                                        this.state.fakeProgress < 100 
                                        ? <p>{'Cargando ' + this.state.fakeProgress + '%'}</p>
                                        : <p><span>100% Cargado</span></p>
                                    }
                                </div>
                                <div className='bar loading-bar'>
                                    <div style={progress}></div>
                                </div>
                                <div className='load-button'>
                                    {   
                                        this.state.fakeProgress < 100
                                        ?
                                        <p onClick={this.cancelLoad}>Cancelar</p>
                                        :
                                        <p className='load-filename'>{this.state.fileName}</p>
                                    }
                                </div>   
                            </div>
                        }

                        <div className='movie-inputs'>
                            <div className='input-title'>
                                <label htmlFor='title'>NOMBRE DE LA PELÍCULA</label>
                                <input id='title' type='text' autocomplete="off" value={this.state.title} onChange={this.handleTitle} placeholder='Escribe el título'/>
                            </div>
                            <div className='select-caategory'>
                                <label htmlFor='category'>CATEGORÍA</label>
                                <div id='category' className='category-select-wrapper' onClick={this.openCategories}>
                                    <div id='category-select' className='category-select'>
                                        <div className="category-select-trigger" >
                                            <p id='actual-selection'>Selecciona una opción</p>
                                        </div>
                                        <div className="category-options">
                                            {
                                                categories.genres.map(
                                                    cat => <span className="category-option" onClick={this.selectCategory} data-value={cat.id} key={cat.id}>{cat.name}</span>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='upload-button-container'>
                            <button disabled={!fullMovieSpecs} onClick={this.uploadnewMovie}>
                                Subir Película
                            </button>
                        </div>
                    </div>
                    :
                    <div className='modal modal-thanks'>
                        <div className='close-x' onClick={this.props.closeModal} >x</div>
                        <img src={logo} alt='liteflix logo' />
                        <div className='modal-thanks-text'>
                            <p>
                                <span>Felicitaciones!</span><br />
                                <span>{this.state.title}</span> fue correctamente subido 
                                a la categoría <span>{categories.genres.filter(cat => cat.id === this.state.category)[0].name}</span>
                                </p>
                        </div>
                        <button onClick={this.props.closeModal}>
                            Cerrar
                        </button>
                    </div>                            
                }
            </div>
        );
    }
}

export default UploadModal;