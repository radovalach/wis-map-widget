import { useState, useEffect } from 'preact/hooks';
import { TransitionGroup, CSSTransition } from 'preact-transitioning';

import './style.css';
import Filter from './Filter';
import Pin from './Pin';

const App = ({ categories, countries }) => {
    const [selectedCategories, setSelectedCategories] = useState(categories.map(({ id }) => id));
    const [displayedPins, setDisplayedPins] = useState([]);
    const [activeTooltip, setActiveTooltip] = useState(null);

    useEffect(() => {
        setDisplayedPins([]);
        setActiveTooltip(null);

        const filteredPins = countries
            .filter(({ locations }) =>
                locations.some(location =>
                    location.categories.some(category =>
                        selectedCategories.includes(category)
                    )
                )
            )
            .sort((a, b) => a.position.left - b.position.left);

        setTimeout(() => setDisplayedPins(filteredPins), displayedPins.length * 50);
    }, [selectedCategories]);

    return (
        <div>
            <Filter
                categories={categories}
                selectedCategories={selectedCategories}
                onChange={setSelectedCategories}
            />
            <div className="map">
                <TransitionGroup duration={displayedPins.length * 50} appear>
                    {displayedPins.map((pin, i) => (
                        <CSSTransition
                            key={pin.name}
                            classNames="drop-pin"
                        >
                            <div
                                className="transition"
                                style={{
                                    transitionDelay: `${i*0.05}s`,
                                    zIndex: activeTooltip === pin.name ? 999 : 1
                                }}
                            >
                                <Pin
                                    activeTooltip={activeTooltip}
                                    setActiveTooltip={setActiveTooltip}
                                    categories={categories}
                                    selectedCategories={selectedCategories}
                                    {...pin}
                                />
                            </div>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
        </div>
    );
};

export default App;
