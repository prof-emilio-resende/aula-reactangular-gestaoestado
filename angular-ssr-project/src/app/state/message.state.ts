import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';

// A interface para o estado
export interface MessageStateModel {
  message: string;
}

// O estado inicial
const defaults: MessageStateModel = {
  message: ''
};

// A ação que irá alterar o estado
export class SetMessage {
  static readonly type = '[Message] Set';
  constructor(public message: string) {}
}

@State<MessageStateModel>({
  name: 'msg',
  defaults
})
@Injectable()
export class MessageState {
  @Action(SetMessage)
  setMessage(ctx: StateContext<MessageStateModel>, action: SetMessage) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      message: action.message
    });
  }
}