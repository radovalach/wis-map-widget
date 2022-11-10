import { CSSTransition } from 'preact-transitioning';

const Pin = ({ categories, selectedCategories, position, name, locations, activeTooltip, setActiveTooltip }) => (
    <div
        className="pin"
        style={{
            top: position.top,
            left: position.left,
        }}
        onClick={() => setActiveTooltip(activeTooltip === name ? null : name)}
    >
          <CSSTransition
              in={activeTooltip === name}
              duration={150}
              classNames="fade"
          >
            <div className='transition'>
              <div className="map__tooltip">
                <h3>{name}</h3>
                {locations
                    .filter(({ categories }) => categories.some(category => selectedCategories.includes(category)))
                    .map((location) => (
                        <div key={location.name}>
                            <h4>{location.name}</h4>
                            <p>
                                {location.categories.map(category => categories.filter(({ id }) => id == category)[0]?.name).join(', ')}
                            </p>
                        </div>
                ))}
              </div>
            </div>
          </CSSTransition>
    </div>
);

export default Pin;
