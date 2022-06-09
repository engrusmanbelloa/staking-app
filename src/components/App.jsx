import React, {Component} from "react";
import "./App.css";
import Navbar  from "./Navbar"
import Web3 from "web3";
import naira from "../truffle_abi/Naira.json";
import btk from "../truffle_abi/btk.json";
import ebank from "../truffle_abi/ebank.json"
import Main from "./Main";
import ParticleSettings from "./perticleSettings"

class App extends Component {
    async UNSAFE_componentWillMount() {
        await this.loadweb3()
        await this.loadBlockchainData()
    }

    async loadweb3(){
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable()
        } else if(window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('no eth browser found');
        }
    }

    async loadBlockchainData() {
        const web3 = await window.web3;
        const account = await web3.eth.getAccounts();
        this.setState({account: account[0]})
        const ntwId = await web3.eth.net.getId();

        //Loading naira contract
        const nairaData = naira.networks[ntwId];
        if (nairaData) {
            const eNaira = new web3.eth.Contract(naira.abi, nairaData.address);
            this.setState({eNaira})
            let nairaBal = await eNaira.methods.balanceOf(this.state.account).call();
            this.setState({nairaBal: nairaBal.toString()})
        } else {
            window.alert("no naira contract found")
        }

        // loading btk contract
        const btkData = btk.networks[ntwId];
        if (btkData) {
            const rwd = new web3.eth.Contract(btk.abi, btkData.address);
            this.setState({rwd})
            let rwdBal = await rwd.methods.balanceOf(this.state.account).call();
            this.setState({rwdBal: rwdBal.toString()})
            
        } else {
            window.alert("no btk contract found")
        }

        // loading ebank contract
        const ebankData = ebank.networks[ntwId];
        if (ebankData) {
            const eBank = new web3.eth.Contract(ebank.abi, ebankData.address);
            this.setState({eBank})
            let ebankBal = await eBank.methods.stakingBalance(this.state.account).call();
            this.setState({ebankBal: ebankBal.toString()})
        } else {
            window.alert("no ebank contract found")
        }


this.setState({loading: false})
        
    }

    stakeToken = (amount) => {
        this.setState({loading: true})
        this.state.eNaira.function.approve(this.state.eBank._address, amount).send({from: this.state.account}).on("transactionHash", (hash) =>{
            this.state.eBank.function.depositTokens(amount).send({from: this.state.account}).on("transactionHash", (hash) =>{
                this.setState({loading: false})
            })
        })
    }

    unstakeToken = (amount) => {
        this.setState({loading: true})
        this.state.eBank.function.unstakeToken(amount).send({from: this.state.account}).on("transactionHash", (hash) =>{
                this.setState({loading: false})
            })
    }

    constructor(props){
        super(props)
        this.state = {
            account: "0x0",
            eNaira: {},
            rwd: {},
            eBank: {},
            nairaBal: "0",
            rwdBal: "0",
            stakingBal: "0",
            loading: true


        }
    }

    render(){
        let content
        
        this.state.loading ? content = 
            <p id="loader" className="text-center" style={{margin: "30px"}}>
            Loading</p> : content = < Main
            rwdBal = {this.state.rwdBal}
            nairaBal = {this.state.nairaBal}
            stakingBal = {this.state.stakingBal}
            stakeToken = {this.stakeToken}
            unstakeToken = {this.unstakeToken}
            />
        return(
            <div className="App" style={{positon: "relative"}}>
                <div style={{position: "absolute"}}>
                    <ParticleSettings />
                </div>
                <Navbar account={this.state.account}/>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <main role="main" className="col-lg-12 ml-auto mr-auto" style={{maxWidth: "600px", minHeight: "100vm"}}>
                            <div>{content}</div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;