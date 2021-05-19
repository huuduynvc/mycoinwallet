import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

const CardMain = ({ title, content, img, avatar, onClick }) => {
    const onCopy = () => {
        onClick();
    };
    return (
        <div className="cardmain__wrapper" style={{'background':'gray','margin-top':'70px','margin-right':'50px','margin-left':'50px','width':'100%','white-space':'nowrap','overflow':'hidden'}}>
            <div >
                <h3>{title}</h3>
                <p style={{'text-overflow':'ellipsis'}}>{content}</p>
                {img?.map( (e,index) => e.type === "clipboard" ?
                    (<CopyToClipboard key={index} onCopy={onCopy} text={content}>
                        <img src={e.src} alt={e.alt} />
                    </CopyToClipboard>
                    ) :
                    (<img key={index} src={e.src} alt={e.alt} />))}
            </div>
        </div>
    );
}

export default CardMain;
