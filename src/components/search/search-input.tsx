'use client';

import {
	useCallback,
	useEffect,
	useRef,
	useState,
	// Remove unused: type KeyboardEvent,
	// Remove unused: type ChangeEvent,
} from 'react';
import { Search, X } from 'react-feather';
import { BaseButton } from '@vaa/components/button';

// Mock data for autocomplete - replace with API calls or more robust logic
const MOCK_CATEGORIES = [
	'Electronics',
	'Books',
	'Clothing',
	'Home',
	'Garden',
	'Sports',
	'Toys',
];
const MOCK_VENDORS = [
	'TechStore',
	'BookWorld',
	'FashionHub',
	'HomeGoods',
	'GardenPro',
	'SportGear',
	'ToyEmporium',
];

export interface SearchInputProps {
	initialValue?: string;
	onSearch: (query: string) => void;
	placeholder?: string;
}

export function SearchInput({
	initialValue = '',
	onSearch,
	placeholder = 'Search products... (#category @vendor "exact phrase")',
}: SearchInputProps) {
	const [inputValue, setInputValue] = useState(initialValue);
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const suggestionsRef = useRef<HTMLUListElement>(null);

	const getSuggestions = useCallback((currentInput: string): string[] => {
		const lastChar = currentInput.slice(-1);
		const lastWordMatch = currentInput.match(/([#@])(\w*)$/);

		if (lastWordMatch?.[1] && lastWordMatch[2] !== undefined) {
			const prefix = lastWordMatch[1];
			const term = lastWordMatch[2].toLowerCase();
			if (prefix === '#') {
				return MOCK_CATEGORIES.filter((cat) =>
					cat.toLowerCase().startsWith(term),
				).map((cat) => `#${cat}`);
			}
			if (prefix === '@') {
				return MOCK_VENDORS.filter((ven) =>
					ven.toLowerCase().startsWith(term),
				).map((ven) => `@${ven}`);
			}
		}
		return [];
	}, []);

	useEffect(() => {
		if (inputValue) {
			const newSuggestions = getSuggestions(inputValue);
			setSuggestions(newSuggestions);
			setShowSuggestions(newSuggestions.length > 0);
			setActiveSuggestionIndex(-1); // Reset active suggestion
		} else {
			setSuggestions([]);
			setShowSuggestions(false);
		}
	}, [inputValue, getSuggestions]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (showSuggestions && suggestions.length > 0) {
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				setActiveSuggestionIndex((prev) => (prev + 1) % suggestions.length);
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				setActiveSuggestionIndex(
					(prev) => (prev - 1 + suggestions.length) % suggestions.length,
				);
			} else if (e.key === 'Enter' || e.key === 'Tab') {
				if (activeSuggestionIndex > -1 && suggestions[activeSuggestionIndex]) {
					e.preventDefault();
					const selectedSuggestion = suggestions[activeSuggestionIndex];
					const currentLastWordMatch = inputValue.match(/([#@])\w*$/); // Re-evaluate match
					if (currentLastWordMatch) {
						const baseInput = inputValue.substring(
							0,
							inputValue.lastIndexOf(currentLastWordMatch[0]),
						);
						setInputValue(`${baseInput}${selectedSuggestion} `);
					} else {
						setInputValue(`${selectedSuggestion} `);
					}
					setShowSuggestions(false);
					setActiveSuggestionIndex(-1);
					inputRef.current?.focus();
				} else if (e.key === 'Enter') {
					handleSubmit();
				}
			} else if (e.key === 'Escape') {
				setShowSuggestions(false);
				setActiveSuggestionIndex(-1);
			}
		} else if (e.key === 'Enter') {
			handleSubmit();
		}
	};

	const handleSuggestionClick = (suggestion: string) => {
		const currentLastWordMatch = inputValue.match(/([#@])\w*$/); // Re-evaluate match
		if (currentLastWordMatch) {
			const baseInput = inputValue.substring(
				0,
				inputValue.lastIndexOf(currentLastWordMatch[0]),
			);
			setInputValue(`${baseInput}${suggestion} `);
		} else {
			setInputValue(`${suggestion} `);
		}
		setShowSuggestions(false);
		setActiveSuggestionIndex(-1);
		inputRef.current?.focus();
	};

	const handleSubmit = () => {
		onSearch(inputValue.trim());
		setShowSuggestions(false);
	};

	const clearInput = () => {
		setInputValue('');
		onSearch('');
		inputRef.current?.focus();
	};

	// Scroll active suggestion into view
	useEffect(() => {
		if (activeSuggestionIndex > -1 && suggestionsRef.current) {
			const activeElement = suggestionsRef.current.children[
				activeSuggestionIndex
			] as HTMLLIElement;
			if (activeElement) {
				activeElement.scrollIntoView({ block: 'nearest' });
			}
		}
	}, [activeSuggestionIndex]);

	return (
		<div className="form-control w-full">
			<div className="join w-full">
				<div className="join-item flex items-center pl-3">
					<Search size={20} className="text-base-content text-opacity-50" />
				</div>
				<input
					ref={inputRef}
					type="text"
					className="input input-bordered join-item flex-grow"
					placeholder={placeholder}
					value={inputValue}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					onFocus={() =>
						inputValue &&
						getSuggestions(inputValue).length > 0 &&
						setShowSuggestions(true)
					}
					onBlur={() => setTimeout(() => setShowSuggestions(false), 150)} // Delay to allow click on suggestions
					aria-autocomplete="list"
					aria-expanded={showSuggestions}
					aria-controls="search-suggestions"
				/>
				{inputValue && (
					<BaseButton
						type="button"
						onClick={clearInput}
						variant="ghost"
						className="join-item"
						aria-label="Clear search"
					>
						<X size={18} />
					</BaseButton>
				)}
			</div>
			{showSuggestions && suggestions.length > 0 && (
				<ul
					id="search-suggestions"
					ref={suggestionsRef}
					className="menu absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-base-300 bg-base-100 shadow-lg"
					// biome-ignore lint/a11y: This UL is part of a custom ARIA combobox implementation.
					role="listbox"
					tabIndex={0}
				>
					{suggestions.map((suggestion, index) => (
						<li
							key={suggestion}
							className={index === activeSuggestionIndex ? 'menu-active' : ''}
							onClick={() => handleSuggestionClick(suggestion)}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault(); // Prevent space from scrolling page
									handleSuggestionClick(suggestion);
								}
							}}
							// biome-ignore lint/a11y: onMouseDown is used to prevent blur before click for custom combobox.
							onMouseDown={(e) => e.preventDefault()}
							// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: li with role=option is standard for combobox.
							role="option"
							aria-selected={index === activeSuggestionIndex}
							id={`suggestion-${index}`}
							tabIndex={0}
						>
							<button type="button">{suggestion}</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
