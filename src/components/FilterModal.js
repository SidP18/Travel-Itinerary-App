import React, { useState, useRef, useEffect } from "react";
import "./filter-modal.css";

export const FilterModal = (props) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const filterOptions = [
    { label: "Pizza", icon: "Pizza" },
    { label: "Fast Food", icon: "FastFood" },
    { label: "Sandwiches", icon: "Sandwiches" },
    { label: "Bars", icon: "Bars" },
    { label: "American", icon: "American" },
    { label: "Mexican", icon: "Mexican" },
    { label: "Burgers", icon: "Burgers" },
    { label: "Chicken Wings", icon: "ChickenWings" },
    { label: "Breakfast", icon: "Breakfast" },
    { label: "Chinese", icon: "Chinese" },
    { label: "Salad", icon: "Salad" },
    { label: "Coffee", icon: "Coffee" },
    { label: "Seafood", icon: "Seafood" },
    { label: "Italian", icon: "Italian" },
    { label: "Japanese", icon: "Japanese" },
    { label: "Mediterranean", icon: "Mediterranean" },
    { label: "Barbeque", icon: "Barbeque" },
    { label: "Tacos", icon: "Tacos" },
    { label: "Steakhouses", icon: "Steakhouses" },
    { label: "Greek", icon: "Greek" },
    { label: "Indian", icon: "Indian" },
    { label: "Desserts", icon: "Desserts" },
    { label: "Sushi", icon: "Sushi" },
    { label: "Vegan", icon: "Vegan" },
    { label: "Gluten-Free", icon: "Gluten-Free" },
    { label: "Vegetarian", icon: "Vegetarian" },
    { label: "Korean", icon: "Korean" },
    { label: "Cheesesteaks", icon: "Cheesesteaks" },
    { label: "Thai", icon: "Thai" },
    { label: "Vietnamese", icon: "Vietnamese" },
    { label: "Waffles", icon: "Waffles" },
    { label: "Buffets", icon: "Buffets" },
    { label: "Southern", icon: "Southern" },
    { label: "Noodles", icon: "Noodles" },
    { label: "Ramen", icon: "Ramen" },
  ];

  const handleFilterSelection = (event) => {
    const selectedFilter = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      props.setFilters((prevFilters) => [...prevFilters, selectedFilter]);
    } else {
      props.setFilters((prevFilters) =>
        prevFilters.filter((filter) => filter !== selectedFilter)
      );
    }
  };

  const handleClearFilters = () => {
    props.setFilters([]);
    setShowModal(false);
  };

  const handleSubmit = () => {
    // do something with the selected filters
    console.log(props.filters);
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleSubmit();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button className="show-modal-button" onClick={() => setShowModal(true)}>Open Filter Modal</button>
      <div className={showModal ? "overlay show" : "overlay"} />
      {showModal && (
        <div className="modal" ref={modalRef}>
          <div className="close" onClick={handleClose}>
            X
          </div>
          <h2>Filter Modal</h2>
          <div className="filter-grid">
            {filterOptions.map((option) => (
              <div className="filter-item" key={option.label}>
                <input
                  className="filter-select"
                  type="checkbox"
                  value={option.label}
                  checked={props.filters.includes(option.label)}
                  onChange={handleFilterSelection}
                />
                <div className="filter-option">
                  <div className={`icon ${option.icon}`} />
                  <div className="label">{option.label}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="modal-buttons">
            <button onClick={handleClearFilters}>Clear Filters</button>
            <button onClick={handleSubmit}>Apply Filters</button>
          </div>
        </div>
      )}
    </>
  );
}