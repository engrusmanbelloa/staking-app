import React, {Component} from "react";
import naira from "../naira.png";

class Main extends Component{
    render(){
        return(
            <div id="content" className="mt-3">
                <table className="table text-muted text-center">
                <thead>
                    <tr style={{color:"white"}}>
                        <th scope="col">Staking Balance</th>
                        <th scope="col">Reward Balance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{color:"white"}}>
                        <td>{window.web3.utils.fromWei(this.props.stakingBal, "Ether")} eNaira</td>
                        <td>{window.web3.utils.fromWei(this.props.rwdBal, "Ether")} BTK</td>
                    </tr>
                </tbody>
                </table>
                <div className="card mb-2" style={{opacity: "0.9"}}>
                    <form 
                    onSubmit={(e) => {
                        e.preventDefault()
                        let amount
                        amount = this.input.value.toString()
                        amount = window.web3.utils.toWei(amount, "Ether")
                        this.props.stakeToken(amount)
                    }}
                    className="mb-3">
                        <div style={{boarderSpacing: "0 1em"}}>
                            <label className="float-left" style={{marginLeft: "15px"}}><b>Stake</b></label>
                            <span className="float-right" style={{marginright: "8px"}}>
                                Balance: {window.web3.utils.fromWei(this.props.nairaBal, "Ether")}&nbsp;
                            </span>
                            <div className="input-group mb-4">
                                <input 
                                ref={(input) => {this.input = input}}

                                type="text" placeholder="0" required />
                                <div className="input-grouped-open">
                                    <div className="input-group-text">
                                        <img src={naira} alt="naira" height="32"/>&nbsp;&nbsp;NGN
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg btn-block">DEPOSIT</button>
                        </div>
                    </form>
                    <button 
                        type="submit"
                        onClick={(e)=>{
                            e.preventDefault(
                                this.props.unstakeToken()
                            )
                        }}
                        className="btn btn-primary btn-lg btn-block">WITHDRAW</button>
                    <div className="card-body text-center" style={{color: "blue"}}>
                        AIRDROP
                    </div>
                </div>

            </div>
        );
    }
}

export default Main;