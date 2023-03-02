import React, { useEffect, useState } from 'react';


type DropDownProps = {
  cities: string[];
  showDropDown: boolean;
  toggleDropDown: Function;
  citySelection: Function;
};

const DropDown: React.FC<DropDownProps> = ({
  cities,
  citySelection,
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  /**
   * Handle passing the city name
   * back to the parent component
   *
   * @param type  The selected type
   */
  const onClickHandler = (type: string): void => {
    citySelection(type);
  };

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <>
      <div className={showDropDown ? 'dropdown' : 'dropdown active'}>
        {cities.map(
          (type: string, index: number): JSX.Element => {
            return (
              <p
                key={index}
                onClick={(): void => {
                  onClickHandler(type);
                }}
              >
                {type}
              </p>
            );
          }
        )}
      </div>
    </>
  );
};

export default DropDown;
