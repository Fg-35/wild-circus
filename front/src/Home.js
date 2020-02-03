import React from 'react';
import Welcome from './components/Welcome/Welcome';



class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { isLogged } = this.props;
        return (
            <div className="home">
                <Welcome isLogged={isLogged}/>
            </div>
        ); 
    }
}

export default Home;