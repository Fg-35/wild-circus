import React from 'react';
import Welcome from './components/Welcome/Welcome';
import Caroussel from './components/Caroussel/Caroussel';
import Presentation from './components/Presentation/Presentation';



class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { isLogged } = this.props;
        return (
            <div className="home">
                <Caroussel isLogged={isLogged}/>
                <Welcome isLogged={isLogged}/>
                <Presentation isLogged={isLogged}/>
            </div>
        ); 
    }
}

export default Home;