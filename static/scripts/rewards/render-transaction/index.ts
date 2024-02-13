import { networkRpcs, networkExplorers } from "../constants";
import { ClaimTx } from "./tx-type";

class AppState {
  public claimTxs: ClaimTx[] = [];
  private _currentIndex = 0;

  get currentIndex(): number {
    return this._currentIndex;
  }

  get currentTx(): ClaimTx | null {
    return this.currentIndex < this.claimTxs.length ? this.claimTxs[this.currentIndex] : null;
  }

  get currentNetworkRpc(): string {
    if (!this.currentTx) {
      return "0x1";
    }
    return networkRpcs[this.currentTx.networkId] || "0x1";
  }

  get currentExplorerUrl(): string {
    if (!this.currentTx) {
      return "https://etherscan.io";
    }
    return networkExplorers[this.currentTx.networkId] || "https://etherscan.io";
  }

  nextTx(): ClaimTx | null {
    this._currentIndex = Math.min(this.claimTxs.length - 1, this._currentIndex + 1);
    return this.currentTx;
  }

  previousTx(): ClaimTx | null {
    this._currentIndex = Math.max(0, this._currentIndex - 1);
    return this.currentTx;
  }
}

export const app = new AppState();