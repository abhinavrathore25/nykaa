import React, { useState, useEffect } from 'react';
import { folderClosedIcon, folderOpenedIcon, arrowDown, arrowUp, fileIcon } from './Icons';

const Explorer = ({ explorerData, level, customClass, openedFile }) => {

    const [toggle, setToggle] = useState({});

    useEffect(() => {
        !Array.isArray(explorerData) &&
            Object.keys(explorerData).forEach(key => {
                setToggle({ ...toggle, [key]: false });
            });

        // eslint-disable-next-line
    }, [explorerData]);

    const customMargin = (Number(level) / 5) * 20;

    const handleToggle = (e, target, item) => {
        e.stopPropagation();
        const child = Array.from(document.getElementsByClassName(`children-${target}`));

        child.forEach(element => {
            element.style.display = element.style.display === 'none' ? 'block' : 'none';
        });

        setToggle({ ...toggle, [item]: !toggle[item] });
    }

    return (
        <div>
            {
                Object.keys(explorerData).map((item, index) => {
                    return <div key={index} className={`parent-${level}-${index} ${customClass}`}
                        style={{ marginLeft: `${customMargin}px` }}>
                        <p onClick={(e) => handleToggle(e, `${level}-${index}`, item)}
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                            <span>{!toggle[item] ? folderOpenedIcon() : folderClosedIcon()} {item}</span>
                            <span>{!toggle[item] ? arrowDown() : arrowUp()} </span>
                        </p>

                        {(Array.isArray(explorerData[item]) === true)
                            ?
                            <div
                                className={`children-${level}-${index}`}
                                style={{ marginLeft: `${customMargin - 5}px` }}>

                                {
                                    explorerData[item]
                                        .map((file, index) =>
                                            <p key={index} onClick={() => openedFile(file)}>
                                                &nbsp; {fileIcon()} {file}
                                            </p>)
                                }
                            </div>
                            :
                            <Explorer explorerData={explorerData[item]} level={level + 1} customClass={`children-${level}-${index}`} openedFile={(filename) => openedFile(filename)} />
                        }
                    </div>
                })
            }
        </div>
    )
}

export default Explorer;