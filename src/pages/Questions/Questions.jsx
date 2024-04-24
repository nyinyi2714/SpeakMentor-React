import React, { useState } from 'react';
import iso6391 from 'iso-639-1';
import Dropdown from 'react-dropdown-select';
import './Questions.css';
import { useBackend } from '../../hooks';
import { useNavigate } from 'react-router-dom';

export default function Questions() {
  const { submitBackgroundQuestions } = useBackend();
  const navigate = useNavigate();

  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [birth_year, setBirthYear] = useState('');
  const [years_speaking_english, setExperience] = useState('');

  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
  };

  const handleBirthYearChange = (e) => {
    setBirthYear(e.target.value);
  };

  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };

  const handleQuestionsSubmit = async (e) => {
    e.preventDefault()
    const isSuccessful = await submitBackgroundQuestions({
      native_language: selectedLanguage[0].label,
      birth_year,
      years_speaking_english
    })

    // if successful, redirect to homepage
    if(isSuccessful) navigate('/')
  }

  const languageOptions = iso6391.getAllNames();
  const currentYear = new Date().getFullYear();
  const minBirthYear = currentYear - 120;

  return (
    <div className='questions-page'>
      <form className='questions-form' onSubmit={handleQuestionsSubmit}>
        <h1>Background Questions</h1>
        <label htmlFor='language-dropdown'>
          What is your Native Language?
          <Dropdown
            options={languageOptions.map((language, index) => ({
              value: iso6391.getCode(language),
              label: language,
              key: index,
            }))}
            onChange={(value) => handleLanguageChange(value)}
            searchable
            placeholder="Select your Native Language"
            values={selectedLanguage}
            id='language-dropdown'
            className='questions-dropdown'
            aria-label="Select your Native Language"
            required
          />
        </label>

        <label htmlFor='birth-year' className='flex-input'>
          What year were you born in?
          <input
            className='number-input'
            id='birth-year'
            type="number"
            value={birth_year}
            onChange={handleBirthYearChange}
            min={minBirthYear}
            max={currentYear}
            placeholder='2000'
            aria-label="What year were you born in?"
            required
          />
        </label>

        <label htmlFor="experience" className='flex-input'>
          How long have you been learning English?
          <input
            className='number-input'
            id='experience'
            type="number"
            value={years_speaking_english}
            onChange={handleExperienceChange}
            min={0}
            max={100}
            aria-label="How long have you been learning English?"
            placeholder='In Years'
            required
          />
        </label>
        <input className='question__btn' type="submit" value='Submit' />
        <div className='foot-note'>
          <h2>Data Safety</h2>
          <p>
            This data is collected to provide a more personalized learning experience and will not be shared with any third parties.
          </p>
        </div>
      </form>
    </div>
  );
}
