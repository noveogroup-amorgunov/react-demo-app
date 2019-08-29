import React, { Component } from 'react';
import _ from 'lodash';
import getGiphy from '../services/giphy';

class App extends Component {
    state = {
        isLoading: false,
        items: []
    };

    render() {
        return (
            <div>
                <div>
                    <input
                        type="text"
                        onChange={this.onChangeInput}
                    />
                </div>
                {this.renderItems()}
            </div>
        )
    }

    renderItems = () => {
        const { isLoading, items } = this.state;

        if (isLoading) {
            return (<div>Загрузка...</div>);
        }

        if (!items.length) {
            return (<div>Нет данных</div>);
        }

        return items.map(url => {
            return (<img key={url} src={url} />);
        });
    };

    // Этот метод вызывается на каждое изменение инпута
    onChangeInput = (event) => {
        const query = event.currentTarget.value;

        // Изменяем состояние компонента на isLoading,
        // Что-бы показывать пользователю, что загрузка началась
        this.setState({ isLoading: true });

        // Отправляем запрос на получение gif-ок
        getGiphy(query).then(items => {

            // Добавляем в состояние массив с данными
            this.setState({ isLoading: false, items });
        });
    };
}

export default App;
