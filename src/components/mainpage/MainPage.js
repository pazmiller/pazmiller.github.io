import React from 'react';
import './MainPage.css';
import {useSpring, animated} from "@react-spring/web";
import StockInfo from '../stock/StockInfo'; // 引入 StockInfo 组件

function MainPage() {
    // Animation
    const props = useSpring({
        from: {opacity: 0, transform: 'scale(1.2)'},
        to: {opacity: 1, transform: 'scale(1)'},
        config: {duration: 1000}
    });

    return (
        <animated.div className="main-page" style={props}>
            <div className="content">
                <h1>Welcome to My Personal Website</h1>
                <p>This is the default homepage.</p>
            </div>
            {/* 添加 StockInfo 组件，显示股票信息 */}
            <div className="stock-info-section">
                <StockInfo />
            </div>
        </animated.div>
    );
}

export default MainPage;
