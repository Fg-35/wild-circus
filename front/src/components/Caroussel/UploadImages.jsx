import React, { Component } from "react";
const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

class UploadImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectFileImages: undefined,
            loaded: false,
            title: '',
            alt: '',
            fileName: '',
            disabled: true,
        };
    }

    onChangeHandler = event => {

        switch (event.target.name) {
            case "titre":
                this.setState({
                    title: event.target.value,
                });
                break;
            case "alt":
                this.setState({
                    alt: event.target.value,
                });
                break;
            case "file":
                const file = event.target.files[0];
                const validFilename = /^[\w,-]+\.[A-Za-z]{3}$/i.test(file.name);
                if (validFilename) {
                    this.setState({
                        selectFileImages: event.target.files[0],
                        disabled: false,
                    });
                } else {
                    alert("Veuillez entrer un fichier avec des caractéres appropriés");
                }
                break;
            default:
                break;
        }
    }

    onClickHandler = () => {
        const { selectFileImages, title, alt } = this.state;
        if (selectFileImages !== undefined && title !== '' && alt !== '') {
            const bearerToken = 'Bearer ' + localStorage.getItem('token');
            const data = new FormData();
            data.append("file", this.state.selectFileImages);
            fetch(SERVER_ADDRESS + '/uploadImages', {
                method: 'Post',
                headers: new Headers({
                    'Authorization': bearerToken
                }),
                mode: "cors",
                credentials: "same-origin",
                redirect: "follow",
                referrer: "no-referrer",
                body: data
            })
                .then(res => res.json())
                .then(data => {
                    this.setState({ fileName: data.name, loaded: true });
                    const mydata = {
                        url: data.name,
                        title: title,
                        alt: alt,
                    };
                    fetch(SERVER_ADDRESS + '/images/' + this.props.imagesId, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': bearerToken,
                        },
                        method: 'PUT',
                        body: JSON.stringify(mydata),
                    })
                        .then(responseImages => responseImages.json())
                        .then(data => {
                            if (data !== undefined) {
                                this.props.onImageChange();
                            }
                        });
                });
        } else {
            alert("Veuillez remplir tous les champs");
        }
    };

    render() {
        return (
            <div>
                <input type="file"
                    name="file"
                    onChange={this.onChangeHandler}
                    accept=".png, .jpg, .jpeg"
                />
                <p>Titre</p>
                <input type="text"
                    name="titre"
                    onChange={this.onChangeHandler}
                />
                <p>Titre Malvoyants</p>
                <input type="text"
                    name="alt"
                    onChange={this.onChangeHandler}
                />
                <button type="button"
                    className="btn btn-success btn-block"
                    onClick={this.onClickHandler}
                    disabled={this.state.disabled}>
                    Envoyer !
                </button>
            </div>
        )
    }
}

export default UploadImages;