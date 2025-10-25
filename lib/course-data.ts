export interface Exercise {
  id: string
  title: string
  difficulty: 1 | 2 | 3 | 4 // 1=easy, 2=medium, 3=hard, 4=super hard
  description: string
  starterCode: string
  solution: string
  hints: string[]
  testCases?: {
    input: string
    expectedOutput: string
  }[]
}

export interface Lesson {
  id: string
  title: string
  duration: string
  type: "exercise" | "reading" | "project"
  content: string
  exercises: Exercise[]
}

export interface Module {
  id: number
  slug: string
  title: string
  description: string
  lessons: Lesson[]
  duration: string
  icon: string
}

export const courseModules: Module[] = [
  {
    id: 1,
    slug: "rust-fundamentals",
    title: "Rust Fundamentals",
    description: "Master Rust programming from basics to advanced concepts with 75+ hands-on exercises",
    duration: "40 hours",
    icon: "Code",
    lessons: [
      {
        id: "rust-1-1",
        title: "Getting Started",
        duration: "45 min",
        type: "exercise",
        content: `# Getting Started with Rust

Welcome to your Rust journey! Let's start with the basics.`,
        exercises: [
          {
            id: "hello-1",
            title: "Printing Hello World",
            difficulty: 1,
            description: "Create a function that prints 'Hello, world!' to the console using Rust.",
            starterCode: `fn main() {
    // TODO: Print "Hello, world!" to the console
}`,
            solution: `fn main() {
    println!("Hello, world!");
}`,
            hints: ["Use the println! macro", "Don't forget the exclamation mark"],
          },
        ],
      },
      {
        id: "rust-1-2",
        title: "Variables",
        duration: "90 min",
        type: "exercise",
        content: `# Variables and Mutability

In Rust, variables are **immutable by default**. This is one of Rust's key features that helps you write safe and concurrent code.`,
        exercises: [
          {
            id: "var-1",
            title: "Declaring Variables",
            difficulty: 1,
            description: "Learn to declare immutable variables in Rust and understand their usage.",
            starterCode: `fn main() {
    let __ = 5;
    println!("x = {}", x);
}`,
            solution: `fn main() {
    let x = 5;
    println!("x = {}", x);
}`,
            hints: ["Fill in the blank with 'x'", "Variables must be initialized when declared"],
          },
          {
            id: "var-2",
            title: "Mutable Variables",
            difficulty: 1,
            description: "Define and modify mutable variables in Rust.",
            starterCode: `fn main() {
    let __ x = 1;
    x += 2;
    assert_eq!(x, 3);
    println!("Success!");
}`,
            solution: `fn main() {
    let mut x = 1;
    x += 2;
    assert_eq!(x, 3);
    println!("Success!");
}`,
            hints: ["Use 'mut' keyword to make variables mutable"],
          },
          {
            id: "var-3",
            title: "Constants",
            difficulty: 1,
            description: "Learn how to define and use constants in Rust.",
            starterCode: `fn main() {
    __ MAX_POINTS: u32 = 100_000;
    println!("Max points: {}", MAX_POINTS);
}`,
            solution: `fn main() {
    const MAX_POINTS: u32 = 100_000;
    println!("Max points: {}", MAX_POINTS);
}`,
            hints: ["Use 'const' keyword", "Constants must have type annotations", "Use uppercase with underscores"],
          },
          {
            id: "var-4",
            title: "Shadowing",
            difficulty: 2,
            description: "Understand variable shadowing in Rust.",
            starterCode: `fn main() {
    let x = 5;
    let x = x + 1;
    {
        let x = x * 2;
        println!("Inner scope: {}", x);
    }
    println!("Outer scope: {}", x);
}`,
            solution: `fn main() {
    let x = 5;
    let x = x + 1;
    {
        let x = x * 2;
        println!("Inner scope: {}", x); // Prints 12
    }
    println!("Outer scope: {}", x); // Prints 6
}`,
            hints: [
              "Shadowing creates a new variable",
              "Inner scope shadows outer scope",
              "Original value restored after scope",
            ],
          },
        ],
      },
      {
        id: "rust-1-3",
        title: "Data Types",
        duration: "120 min",
        type: "exercise",
        content: `# Primitive Data Types

Rust is a statically typed language, which means it must know the types of all variables at compile time.`,
        exercises: [
          {
            id: "type-1",
            title: "Primitive Data Types",
            difficulty: 1,
            description: "Get familiar with primitive data types in Rust by defining and annotating variables.",
            starterCode: `fn main() {
    let integer: __ = 42;
    let float: __ = 3.14;
    let boolean: __ = true;
    let character: __ = 'A';
    
    println!("{}, {}, {}, {}", integer, float, boolean, character);
}`,
            solution: `fn main() {
    let integer: i32 = 42;
    let float: f64 = 3.14;
    let boolean: bool = true;
    let character: char = 'A';
    
    println!("{}, {}, {}, {}", integer, float, boolean, character);
}`,
            hints: ["i32 for integers", "f64 for floats", "bool for booleans", "char for characters"],
          },
          {
            id: "type-2",
            title: "Converting Numerical Types",
            difficulty: 1,
            description: "Implement a function to convert numerical types using the 'as' keyword in Rust.",
            starterCode: `fn main() {
    let x: i32 = 10;
    let y: f64 = x __ f64;
    println!("y = {}", y);
}`,
            solution: `fn main() {
    let x: i32 = 10;
    let y: f64 = x as f64;
    println!("y = {}", y);
}`,
            hints: ["Use 'as' keyword for type conversion"],
          },
          {
            id: "type-3",
            title: "Mathematical operations",
            difficulty: 1,
            description:
              "Practice mathematical operations in Rust, including addition, subtraction, multiplication, and division.",
            starterCode: `fn main() {
    let sum = 5 __ 10;
    let difference = 95.5 __ 4.3;
    let product = 4 __ 30;
    let quotient = 56.7 __ 32.2;
    
    println!("{}, {}, {}, {}", sum, difference, product, quotient);
}`,
            solution: `fn main() {
    let sum = 5 + 10;
    let difference = 95.5 - 4.3;
    let product = 4 * 30;
    let quotient = 56.7 / 32.2;
    
    println!("{}, {}, {}, {}", sum, difference, product, quotient);
}`,
            hints: ["Use +, -, *, / operators"],
          },
        ],
      },
      {
        id: "rust-1-4",
        title: "Arrays and Tuples",
        duration: "90 min",
        type: "exercise",
        content: `# Compound Types

Arrays and tuples let you group multiple values together.`,
        exercises: [
          {
            id: "array-1",
            title: "Sum of Array",
            difficulty: 1,
            description: "Calculate the sum of all elements in an array.",
            starterCode: `fn sum_array(arr: &[i32]) -> i32 {
    // TODO: Calculate and return the sum
}

fn main() {
    let numbers = [1, 2, 3, 4, 5];
    let total = sum_array(&numbers);
    assert_eq!(total, 15);
    println!("Success!");
}`,
            solution: `fn sum_array(arr: &[i32]) -> i32 {
    let mut sum = 0;
    for &num in arr {
        sum += num;
    }
    sum
}

fn main() {
    let numbers = [1, 2, 3, 4, 5];
    let total = sum_array(&numbers);
    assert_eq!(total, 15);
    println!("Success!");
}`,
            hints: ["Use a for loop to iterate", "Accumulate the sum in a variable", "Return the sum"],
          },
          {
            id: "tuple-1",
            title: "Tuples",
            difficulty: 1,
            description: "Create a function that returns a tuple of values.",
            starterCode: `fn get_coordinates() -> (__, __) {
    // TODO: Return a tuple with x=10, y=20
}

fn main() {
    let (x, y) = get_coordinates();
    println!("x = {}, y = {}", x, y);
}`,
            solution: `fn get_coordinates() -> (i32, i32) {
    (10, 20)
}

fn main() {
    let (x, y) = get_coordinates();
    println!("x = {}, y = {}", x, y);
}`,
            hints: ["Tuple type is (T1, T2)", "Return tuple with (value1, value2)"],
          },
          {
            id: "unit-1",
            title: "The Unit Type",
            difficulty: 1,
            description: "Understand and use the unit type '()' in Rust.",
            starterCode: `fn do_nothing() -> __ {
    // This function returns nothing
}

fn main() {
    let result = do_nothing();
    println!("Result: {:?}", result);
}`,
            solution: `fn do_nothing() -> () {
    // This function returns nothing
}

fn main() {
    let result = do_nothing();
    println!("Result: {:?}", result);
}`,
            hints: ["Unit type is ()", "Functions without return value return ()"],
          },
        ],
      },
      {
        id: "rust-1-5",
        title: "Functions and Control Flow",
        duration: "90 min",
        type: "exercise",
        content: `# Functions and Control Flow

Learn to write functions and control program flow.`,
        exercises: [
          {
            id: "func-1",
            title: "Functions",
            difficulty: 1,
            description: "Implement and work with functions in Rust.",
            starterCode: `fn add(a: i32, b: i32) -> __ {
    // TODO: Return the sum of a and b
}

fn main() {
    let result = add(5, 3);
    assert_eq!(result, 8);
    println!("Success!");
}`,
            solution: `fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn main() {
    let result = add(5, 3);
    assert_eq!(result, 8);
    println!("Success!");
}`,
            hints: ["Return type is i32", "Last expression is returned without semicolon"],
          },
          {
            id: "control-1",
            title: "Control Flow",
            difficulty: 1,
            description: "Implement basic control flow in Rust using if-else statements.",
            starterCode: `fn main() {
    let number = 6;
    
    // TODO: Print "even" if number is even, "odd" if odd
}`,
            solution: `fn main() {
    let number = 6;
    
    if number % 2 == 0 {
        println!("even");
    } else {
        println!("odd");
    }
}`,
            hints: ["Use if-else statement", "Check if number % 2 == 0"],
          },
        ],
      },
      {
        id: "rust-1-6",
        title: "Ownership",
        duration: "120 min",
        type: "exercise",
        content: `# Ownership: Rust's Most Unique Feature

Ownership is what makes Rust special. It enables memory safety without a garbage collector.`,
        exercises: [
          {
            id: "own-1",
            title: "Ownership Rules",
            difficulty: 2,
            description: "Identify and fix ownership rule violations in Rust code.",
            starterCode: `fn main() {
    let s1 = String::from("hello");
    let s2 = s1;
    println!("{}", s1); // Error!
}`,
            solution: `fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone();
    println!("{}", s1);
}`,
            hints: ["s1 is moved to s2", "Use .clone() to make a copy", "Or use s2 instead of s1"],
          },
          {
            id: "own-2",
            title: "Mutable References",
            difficulty: 2,
            description: "Implement Rust's ownership model with mutable references.",
            starterCode: `fn main() {
    let s = String::from("hello");
    change(&s);
    println!("{}", s);
}

fn change(some_string: &String) {
    some_string.push_str(", world");
}`,
            solution: `fn main() {
    let mut s = String::from("hello");
    change(&mut s);
    println!("{}", s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}`,
            hints: ["Make s mutable", "Pass &mut reference", "Accept &mut String parameter"],
          },
        ],
      },
      {
        id: "rust-1-7",
        title: "Strings and Slices",
        duration: "90 min",
        type: "exercise",
        content: `# Strings and Slices

Work with string types and slices in Rust.`,
        exercises: [
          {
            id: "str-1",
            title: "Character counting string",
            difficulty: 1,
            description:
              "Write a program that takes a string as input and counts the number of characters in the string.",
            starterCode: `fn count_chars(s: &str) -> usize {
    // TODO: Return the number of characters
}

fn main() {
    let text = "Hello";
    assert_eq!(count_chars(text), 5);
    println!("Success!");
}`,
            solution: `fn count_chars(s: &str) -> usize {
    s.len()
}

fn main() {
    let text = "Hello";
    assert_eq!(count_chars(text), 5);
    println!("Success!");
}`,
            hints: ["Use .len() method on string slice"],
          },
          {
            id: "slice-1",
            title: "Slices",
            difficulty: 2,
            description: "Find the largest element in a slice of integers.",
            starterCode: `fn largest(list: &[i32]) -> i32 {
    // TODO: Find and return the largest element
}

fn main() {
    let numbers = vec![34, 50, 25, 100, 65];
    let result = largest(&numbers);
    assert_eq!(result, 100);
    println!("Success!");
}`,
            solution: `fn largest(list: &[i32]) -> i32 {
    let mut largest = list[0];
    for &item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}

fn main() {
    let numbers = vec![34, 50, 25, 100, 65];
    let result = largest(&numbers);
    assert_eq!(result, 100);
    println!("Success!");
}`,
            hints: ["Start with first element", "Iterate and compare", "Update largest when found bigger"],
          },
          {
            id: "slice-2",
            title: "Mutable Slices",
            difficulty: 2,
            description: "Manipulate elements in a mutable slice in-place using iteration.",
            starterCode: `fn double_values(arr: &mut [i32]) {
    // TODO: Double each value in the slice
}

fn main() {
    let mut numbers = [1, 2, 3, 4, 5];
    double_values(&mut numbers);
    assert_eq!(numbers, [2, 4, 6, 8, 10]);
    println!("Success!");
}`,
            solution: `fn double_values(arr: &mut [i32]) {
    for item in arr {
        *item *= 2;
    }
}

fn main() {
    let mut numbers = [1, 2, 3, 4, 5];
    double_values(&mut numbers);
    assert_eq!(numbers, [2, 4, 6, 8, 10]);
    println!("Success!");
}`,
            hints: ["Iterate over mutable slice", "Dereference with * to modify", "Multiply by 2"],
          },
          {
            id: "slice-3",
            title: "Slice Manipulation",
            difficulty: 2,
            description: "Practice updating specific elements of a mutable slice in Rust.",
            starterCode: `fn update_element(arr: &mut [i32], index: usize, value: i32) {
    // TODO: Update the element at index with value
}

fn main() {
    let mut numbers = [1, 2, 3, 4, 5];
    update_element(&mut numbers, 2, 10);
    assert_eq!(numbers, [1, 2, 10, 4, 5]);
    println!("Success!");
}`,
            solution: `fn update_element(arr: &mut [i32], index: usize, value: i32) {
    arr[index] = value;
}

fn main() {
    let mut numbers = [1, 2, 3, 4, 5];
    update_element(&mut numbers, 2, 10);
    assert_eq!(numbers, [1, 2, 10, 4, 5]);
    println!("Success!");
}`,
            hints: ["Access element with arr[index]", "Assign new value directly"],
          },
        ],
      },
      {
        id: "rust-1-8",
        title: "Structs",
        duration: "120 min",
        type: "exercise",
        content: `# Structs

Create custom data types to model your domain.`,
        exercises: [
          {
            id: "struct-1",
            title: "Structs",
            difficulty: 2,
            description: "Learn how to define and use structs in Rust.",
            starterCode: `struct Rectangle {
    // TODO: Add width and height fields
}

fn main() {
    let rect = Rectangle {
        width: 30,
        height: 50,
    };
    println!("Rectangle: {}x{}", rect.width, rect.height);
}`,
            solution: `struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect = Rectangle {
        width: 30,
        height: 50,
    };
    println!("Rectangle: {}x{}", rect.width, rect.height);
}`,
            hints: ["Add width: u32 field", "Add height: u32 field"],
          },
          {
            id: "struct-2",
            title: "Tuple Structs",
            difficulty: 2,
            description: "Learn to define and use tuple structs in Rust.",
            starterCode: `struct Color(__, __, __);

fn main() {
    let black = Color(0, 0, 0);
    println!("Black: ({}, {}, {})", black.0, black.1, black.2);
}`,
            solution: `struct Color(u8, u8, u8);

fn main() {
    let black = Color(0, 0, 0);
    println!("Black: ({}, {}, {})", black.0, black.1, black.2);
}`,
            hints: ["RGB values are 0-255", "Use u8 type for each component"],
          },
          {
            id: "struct-3",
            title: "Constructors",
            difficulty: 2,
            description: "Learn to create constructors for Rust structs.",
            starterCode: `struct Person {
    name: String,
    age: u32,
}

impl Person {
    fn new(name: String, age: u32) -> __ {
        // TODO: Return a new Person instance
    }
}

fn main() {
    let person = Person::new(String::from("Alice"), 30);
    println!("{} is {} years old", person.name, person.age);
}`,
            solution: `struct Person {
    name: String,
    age: u32,
}

impl Person {
    fn new(name: String, age: u32) -> Self {
        Person { name, age }
    }
}

fn main() {
    let person = Person::new(String::from("Alice"), 30);
    println!("{} is {} years old", person.name, person.age);
}`,
            hints: ["Return type is Self", "Use field init shorthand", "Return Person { name, age }"],
          },
          {
            id: "struct-4",
            title: "Unit Structs",
            difficulty: 2,
            description: "Learn about unit structs and their use cases in Rust.",
            starterCode: `struct AlwaysEqual;

fn main() {
    let subject = AlwaysEqual;
    // Unit structs are useful for implementing traits
    println!("Created a unit struct!");
}`,
            solution: `struct AlwaysEqual;

fn main() {
    let subject = AlwaysEqual;
    // Unit structs are useful for implementing traits
    println!("Created a unit struct!");
}`,
            hints: ["Unit structs have no fields", "Useful for trait implementations"],
          },
          {
            id: "struct-5",
            title: "Methods on Structs",
            difficulty: 2,
            description: "Learn how to define and use methods on Rust structs.",
            starterCode: `struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        // TODO: Calculate and return area
    }
}

fn main() {
    let rect = Rectangle { width: 30, height: 50 };
    assert_eq!(rect.area(), 1500);
    println!("Success!");
}`,
            solution: `struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect = Rectangle { width: 30, height: 50 };
    assert_eq!(rect.area(), 1500);
    println!("Success!");
}`,
            hints: ["Multiply width by height", "Access fields with self.field"],
          },
          {
            id: "struct-6",
            title: "Implementing Debug Trait for Structs",
            difficulty: 2,
            description: "Learn to use Rust's 'derive' attribute to implement the 'Debug' trait for custom structs.",
            starterCode: `struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let point = Point { x: 10, y: 20 };
    println!("{:?}", point); // Error: Point doesn't implement Debug
}`,
            solution: `#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let point = Point { x: 10, y: 20 };
    println!("{:?}", point);
}`,
            hints: ["Add #[derive(Debug)] above struct", "This auto-implements Debug trait"],
          },
          {
            id: "struct-7",
            title: "Structs and references",
            difficulty: 3,
            description: "Create a struct that holds a reference and performs keyword searches in a string slice.",
            starterCode: `struct SearchContext<'a> {
    text: &'a str,
}

impl<'a> SearchContext<'a> {
    fn new(text: &'a str) -> Self {
        SearchContext { text }
    }
    
    fn contains(&self, keyword: &str) -> bool {
        // TODO: Check if text contains keyword
    }
}

fn main() {
    let text = "Hello, world!";
    let ctx = SearchContext::new(text);
    assert!(ctx.contains("world"));
    println!("Success!");
}`,
            solution: `struct SearchContext<'a> {
    text: &'a str,
}

impl<'a> SearchContext<'a> {
    fn new(text: &'a str) -> Self {
        SearchContext { text }
    }
    
    fn contains(&self, keyword: &str) -> bool {
        self.text.contains(keyword)
    }
}

fn main() {
    let text = "Hello, world!";
    let ctx = SearchContext::new(text);
    assert!(ctx.contains("world"));
    println!("Success!");
}`,
            hints: ["Use .contains() method on string", "Lifetime 'a ensures reference validity"],
          },
          {
            id: "struct-8",
            title: "Mutable Struct References",
            difficulty: 3,
            description: "Implement a struct that holds a mutable reference to a String and modifies its content.",
            starterCode: `struct Editor<'a> {
    content: &'a mut String,
}

impl<'a> Editor<'a> {
    fn append(&mut self, text: &str) {
        // TODO: Append text to content
    }
}

fn main() {
    let mut text = String::from("Hello");
    {
        let mut editor = Editor { content: &mut text };
        editor.append(", world!");
    }
    assert_eq!(text, "Hello, world!");
    println!("Success!");
}`,
            solution: `struct Editor<'a> {
    content: &'a mut String,
}

impl<'a> Editor<'a> {
    fn append(&mut self, text: &str) {
        self.content.push_str(text);
    }
}

fn main() {
    let mut text = String::from("Hello");
    {
        let mut editor = Editor { content: &mut text };
        editor.append(", world!");
    }
    assert_eq!(text, "Hello, world!");
    println!("Success!");
}`,
            hints: ["Use push_str() to append", "Mutable reference allows modification"],
          },
        ],
      },
      {
        id: "rust-1-9",
        title: "Enums",
        duration: "120 min",
        type: "exercise",
        content: `# Enums

Define a type by enumerating its possible variants.`,
        exercises: [
          {
            id: "enum-1",
            title: "Enums",
            difficulty: 2,
            description: "Learn how to use enums in Rust by implementing a basic TrafficLight enum.",
            starterCode: `enum TrafficLight {
    Red,
    Yellow,
    Green,
}

fn main() {
    let light = TrafficLight::___;
    // TODO: Use match to print the light color
}`,
            solution: `enum TrafficLight {
    Red,
    Yellow,
    Green,
}

fn main() {
    let light = TrafficLight::Green;
    match light {
        TrafficLight::Red => println!("Stop!"),
        TrafficLight::Yellow => println!("Slow down!"),
        TrafficLight::Green => println!("Go!"),
    }
}`,
            hints: ["Choose a variant like Green", "Use match to handle all variants"],
          },
          {
            id: "enum-2",
            title: "Playing Cards",
            difficulty: 2,
            description: "Learn how to use enums with unit and tuple variants by implementing a Card enum.",
            starterCode: `enum Suit {
    Hearts,
    Diamonds,
    Clubs,
    Spades,
}

enum Rank {
    Number(u8),
    Jack,
    Queen,
    King,
    Ace,
}

struct Card {
    suit: Suit,
    rank: Rank,
}

fn main() {
    let card = Card {
        suit: Suit::Hearts,
        rank: Rank::Number(7),
    };
    // Card created successfully
    println!("Success!");
}`,
            solution: `enum Suit {
    Hearts,
    Diamonds,
    Clubs,
    Spades,
}

enum Rank {
    Number(u8),
    Jack,
    Queen,
    King,
    Ace,
}

struct Card {
    suit: Suit,
    rank: Rank,
}

fn main() {
    let card = Card {
        suit: Suit::Hearts,
        rank: Rank::Number(7),
    };
    println!("Success!");
}`,
            hints: ["Enums can have different variant types", "Number variant holds a u8 value"],
          },
          {
            id: "enum-3",
            title: "Complex Enums",
            difficulty: 3,
            description: "Explore complex enums by combining unit, tuple, and named field variants in Rust.",
            starterCode: `enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

fn process_message(msg: Message) {
    // TODO: Use match to handle each variant
}

fn main() {
    let msg = Message::Move { x: 10, y: 20 };
    process_message(msg);
}`,
            solution: `enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

fn process_message(msg: Message) {
    match msg {
        Message::Quit => println!("Quit"),
        Message::Move { x, y } => println!("Move to ({}, {})", x, y),
        Message::Write(text) => println!("Write: {}", text),
        Message::ChangeColor(r, g, b) => println!("Change color to ({}, {}, {})", r, g, b),
    }
}

fn main() {
    let msg = Message::Move { x: 10, y: 20 };
    process_message(msg);
}`,
            hints: ["Match on all variants", "Extract data from variants", "Handle each case appropriately"],
          },
          {
            id: "enum-4",
            title: "Methods on Enums",
            difficulty: 3,
            description: "Learn how to define and use methods on Rust enums.",
            starterCode: `enum TrafficLight {
    Red,
    Yellow,
    Green,
}

impl TrafficLight {
    fn time(&self) -> u8 {
        // TODO: Return time in seconds for each light
        // Red: 60, Yellow: 10, Green: 90
    }
}

fn main() {
    let light = TrafficLight::Red;
    assert_eq!(light.time(), 60);
    println!("Success!");
}`,
            solution: `enum TrafficLight {
    Red,
    Yellow,
    Green,
}

impl TrafficLight {
    fn time(&self) -> u8 {
        match self {
            TrafficLight::Red => 60,
            TrafficLight::Yellow => 10,
            TrafficLight::Green => 90,
        }
    }
}

fn main() {
    let light = TrafficLight::Red;
    assert_eq!(light.time(), 60);
    println!("Success!");
}`,
            hints: ["Use match on self", "Return different values for each variant"],
          },
          {
            id: "enum-5",
            title: "Deriving PartialEq",
            difficulty: 2,
            description: "Learn how to use the 'derive' macro to implement PartialEq for an enum.",
            starterCode: `enum Direction {
    North,
    South,
    East,
    West,
}

fn main() {
    let dir1 = Direction::North;
    let dir2 = Direction::North;
    assert_eq!(dir1, dir2); // Error: PartialEq not implemented
}`,
            solution: `#[derive(PartialEq)]
enum Direction {
    North,
    South,
    East,
    West,
}

fn main() {
    let dir1 = Direction::North;
    let dir2 = Direction::North;
    assert_eq!(dir1, dir2);
    println!("Success!");
}`,
            hints: ["Add #[derive(PartialEq)] above enum", "This enables == comparison"],
          },
          {
            id: "enum-6",
            title: "If Let Enums",
            difficulty: 2,
            description: "Practice pattern matching on enums using 'if let' syntax.",
            starterCode: `enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(String),
}

fn main() {
    let coin = Coin::Quarter(String::from("Alaska"));
    
    // TODO: Use if let to extract and print the state if it's a Quarter
}`,
            solution: `enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(String),
}

fn main() {
    let coin = Coin::Quarter(String::from("Alaska"));
    
    if let Coin::Quarter(state) = coin {
        println!("State quarter from {}!", state);
    } else {
        println!("Not a state quarter");
    }
}`,
            hints: ["Use if let to match Quarter variant", "Extract state from Quarter", "Handle else case"],
          },
        ],
      },
      {
        id: "rust-1-10",
        title: "Collections",
        duration: "120 min",
        type: "exercise",
        content: `# Collections

Work with Rust's collection types: vectors, strings, and hash maps.`,
        exercises: [
          {
            id: "vec-1",
            title: "Vectors",
            difficulty: 2,
            description: "Perform basic operations on vectors in Rust.",
            starterCode: `fn main() {
    let mut v: Vec<i32> = Vec::new();
    
    // TODO: Add elements 1, 2, 3 to the vector
    // TODO: Print the vector
}`,
            solution: `fn main() {
    let mut v: Vec<i32> = Vec::new();
    
    v.push(1);
    v.push(2);
    v.push(3);
    
    println!("{:?}", v);
}`,
            hints: ["Use .push() to add elements", "Use {:?} to print vectors"],
          },
          {
            id: "hash-1",
            title: "Hashmaps",
            difficulty: 2,
            description: "Use Rust's HashMap to create a simple key-value store.",
            starterCode: `use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();
    
    // TODO: Insert "Blue" with score 10
    // TODO: Insert "Yellow" with score 50
    // TODO: Get and print Blue's score
}`,
            solution: `use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();
    
    scores.insert("Blue", 10);
    scores.insert("Yellow", 50);
    
    let score = scores.get("Blue");
    println!("Blue's score: {:?}", score);
}`,
            hints: ["Use .insert(key, value)", "Use .get(key) to retrieve", "get() returns Option<&V>"],
          },
          {
            id: "hash-2",
            title: "Animal sanctuary registry",
            difficulty: 3,
            description: "Create a program that manages a registry of animals in a sanctuary.",
            starterCode: `use std::collections::HashMap;

struct Animal {
    name: String,
    species: String,
}

fn main() {
    let mut registry: HashMap<u32, Animal> = HashMap::new();
    
    // TODO: Add animals to registry
    // TODO: Implement lookup by ID
}`,
            solution: `use std::collections::HashMap;

struct Animal {
    name: String,
    species: String,
}

fn main() {
    let mut registry: HashMap<u32, Animal> = HashMap::new();
    
    registry.insert(1, Animal {
        name: String::from("Leo"),
        species: String::from("Lion"),
    });
    
    registry.insert(2, Animal {
        name: String::from("Ella"),
        species: String::from("Elephant"),
    });
    
    if let Some(animal) = registry.get(&1) {
        println!("{} is a {}", animal.name, animal.species);
    }
}`,
            hints: ["Use u32 as key", "Store Animal struct as value", "Use if let to safely access"],
          },
          {
            id: "hash-3",
            title: "Student Grades Tracker",
            difficulty: 3,
            description: "Manage student grades using structs and hashmaps without error handling.",
            starterCode: `use std::collections::HashMap;

struct Student {
    name: String,
    grades: HashMap<String, u32>,
}

impl Student {
    fn new(name: String) -> Self {
        // TODO: Create new student with empty grades
    }
    
    fn add_grade(&mut self, subject: String, grade: u32) {
        // TODO: Add grade for subject
    }
    
    fn average(&self) -> f64 {
        // TODO: Calculate average grade
    }
}

fn main() {
    let mut student = Student::new(String::from("Alice"));
    student.add_grade(String::from("Math"), 90);
    student.add_grade(String::from("Science"), 85);
    println!("Average: {}", student.average());
}`,
            solution: `use std::collections::HashMap;

struct Student {
    name: String,
    grades: HashMap<String, u32>,
}

impl Student {
    fn new(name: String) -> Self {
        Student {
            name,
            grades: HashMap::new(),
        }
    }
    
    fn add_grade(&mut self, subject: String, grade: u32) {
        self.grades.insert(subject, grade);
    }
    
    fn average(&self) -> f64 {
        if self.grades.is_empty() {
            return 0.0;
        }
        let sum: u32 = self.grades.values().sum();
        sum as f64 / self.grades.len() as f64
    }
}

fn main() {
    let mut student = Student::new(String::from("Alice"));
    student.add_grade(String::from("Math"), 90);
    student.add_grade(String::from("Science"), 85);
    println!("Average: {}", student.average());
}`,
            hints: ["Initialize empty HashMap", "Use .insert() for grades", "Sum values and divide by count"],
          },
          {
            id: "hash-4",
            title: "Student Grades Tracker 2",
            difficulty: 3,
            description: "Extend the student grades system with methods inside the Student struct.",
            starterCode: `use std::collections::HashMap;

struct Student {
    name: String,
    grades: HashMap<String, u32>,
}

impl Student {
    fn highest_grade(&self) -> Option<u32> {
        // TODO: Return the highest grade
    }
    
    fn lowest_grade(&self) -> Option<u32> {
        // TODO: Return the lowest grade
    }
}

fn main() {
    let mut student = Student {
        name: String::from("Bob"),
        grades: HashMap::new(),
    };
    student.grades.insert(String::from("Math"), 90);
    student.grades.insert(String::from("Science"), 85);
    student.grades.insert(String::from("History"), 95);
    
    println!("Highest: {:?}", student.highest_grade());
    println!("Lowest: {:?}", student.lowest_grade());
}`,
            solution: `use std::collections::HashMap;

struct Student {
    name: String,
    grades: HashMap<String, u32>,
}

impl Student {
    fn highest_grade(&self) -> Option<u32> {
        self.grades.values().max().copied()
    }
    
    fn lowest_grade(&self) -> Option<u32> {
        self.grades.values().min().copied()
    }
}

fn main() {
    let mut student = Student {
        name: String::from("Bob"),
        grades: HashMap::new(),
    };
    student.grades.insert(String::from("Math"), 90);
    student.grades.insert(String::from("Science"), 85);
    student.grades.insert(String::from("History"), 95);
    
    println!("Highest: {:?}", student.highest_grade());
    println!("Lowest: {:?}", student.lowest_grade());
}`,
            hints: [
              "Use .values() to get grade values",
              "Use .max() and .min()",
              "Use .copied() to convert &u32 to u32",
            ],
          },
        ],
      },
      {
        id: "rust-1-11",
        title: "Error Handling",
        duration: "120 min",
        type: "exercise",
        content: `# Error Handling

Learn to handle errors gracefully in Rust using Result and Option.`,
        exercises: [
          {
            id: "err-1",
            title: "Using Option<T> for Optional Values",
            difficulty: 2,
            description: "Implement functions that work with optional values using Option<T>.",
            starterCode: `fn divide(a: f64, b: f64) -> Option<f64> {
    // TODO: Return None if b is 0, otherwise return Some(a/b)
}

fn main() {
    match divide(10.0, 2.0) {
        Some(result) => println!("Result: {}", result),
        None => println!("Cannot divide by zero"),
    }
}`,
            solution: `fn divide(a: f64, b: f64) -> Option<f64> {
    if b == 0.0 {
        None
    } else {
        Some(a / b)
    }
}

fn main() {
    match divide(10.0, 2.0) {
        Some(result) => println!("Result: {}", result),
        None => println!("Cannot divide by zero"),
    }
}`,
            hints: ["Check if b is 0.0", "Return None for division by zero", "Return Some(result) otherwise"],
          },
          {
            id: "err-2",
            title: "Graceful error handling",
            difficulty: 2,
            description: "Implement graceful error handling in Rust using the Result type.",
            starterCode: `use std::num::ParseIntError;

fn parse_number(s: &str) -> Result<i32, ParseIntError> {
    // TODO: Parse string to i32
}

fn main() {
    match parse_number("42") {
        Ok(n) => println!("Number: {}", n),
        Err(e) => println!("Error: {}", e),
    }
}`,
            solution: `use std::num::ParseIntError;

fn parse_number(s: &str) -> Result<i32, ParseIntError> {
    s.parse::<i32>()
}

fn main() {
    match parse_number("42") {
        Ok(n) => println!("Number: {}", n),
        Err(e) => println!("Error: {}", e),
    }
}`,
            hints: ["Use .parse::<i32>()", "It returns Result<i32, ParseIntError>"],
          },
          {
            id: "err-3",
            title: "Graceful error handling 2",
            difficulty: 3,
            description: "Enhance error handling by defining custom error types and implementing the 'Error' trait.",
            starterCode: `use std::fmt;

#[derive(Debug)]
enum MathError {
    DivisionByZero,
    NegativeSquareRoot,
}

impl fmt::Display for MathError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        // TODO: Implement display for errors
    }
}

fn divide(a: f64, b: f64) -> Result<f64, MathError> {
    // TODO: Return error if b is 0
}

fn main() {
    match divide(10.0, 0.0) {
        Ok(result) => println!("Result: {}", result),
        Err(e) => println!("Error: {}", e),
    }
}`,
            solution: `use std::fmt;

#[derive(Debug)]
enum MathError {
    DivisionByZero,
    NegativeSquareRoot,
}

impl fmt::Display for MathError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            MathError::DivisionByZero => write!(f, "Cannot divide by zero"),
            MathError::NegativeSquareRoot => write!(f, "Cannot take square root of negative number"),
        }
    }
}

fn divide(a: f64, b: f64) -> Result<f64, MathError> {
    if b == 0.0 {
        Err(MathError::DivisionByZero)
    } else {
        Ok(a / b)
    }
}

fn main() {
    match divide(10.0, 0.0) {
        Ok(result) => println!("Result: {}", result),
        Err(e) => println!("Error: {}", e),
    }
}`,
            hints: ["Implement Display trait", "Use write! macro", "Return Err with custom error"],
          },
          {
            id: "err-4",
            title: "Error Propagation in File Handling",
            difficulty: 2,
            description: "Learn how to propagate errors while reading integers from a file in Rust.",
            starterCode: `use std::fs::File;
use std::io::{self, Read};

fn read_number_from_file(path: &str) -> Result<i32, io::Error> {
    let mut file = File::open(path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    
    // TODO: Parse and return the number
    // Hint: You'll need to handle ParseIntError
}`,
            solution: `use std::fs::File;
use std::io::{self, Read};

fn read_number_from_file(path: &str) -> Result<i32, io::Error> {
    let mut file = File::open(path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    
    contents.trim().parse()
        .map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e))
}`,
            hints: [
              "Use ? operator to propagate errors",
              "Use map_err to convert ParseIntError",
              "Create io::Error with InvalidData kind",
            ],
          },
          {
            id: "err-5",
            title: "Option Propagation in Rust",
            difficulty: 2,
            description: "Learn how to propagate 'Option' values in a clean and idiomatic way.",
            starterCode: `fn get_first_char(s: Option<String>) -> Option<char> {
    // TODO: Get first character if string exists
}

fn main() {
    let text = Some(String::from("Hello"));
    match get_first_char(text) {
        Some(c) => println!("First char: {}", c),
        None => println!("No character"),
    }
}`,
            solution: `fn get_first_char(s: Option<String>) -> Option<char> {
    s?.chars().next()
}

fn main() {
    let text = Some(String::from("Hello"));
    match get_first_char(text) {
        Some(c) => println!("First char: {}", c),
        None => println!("No character"),
    }
}`,
            hints: ["Use ? operator on Option", "Use .chars().next() to get first char"],
          },
          {
            id: "err-6",
            title: "Result to Option",
            difficulty: 2,
            description: "Learn how to handle 'Result' from an I/O operation and convert it to 'Option'.",
            starterCode: `fn parse_number(s: &str) -> Option<i32> {
    // TODO: Parse string and convert Result to Option
}

fn main() {
    match parse_number("42") {
        Some(n) => println!("Number: {}", n),
        None => println!("Failed to parse"),
    }
}`,
            solution: `fn parse_number(s: &str) -> Option<i32> {
    s.parse().ok()
}

fn main() {
    match parse_number("42") {
        Some(n) => println!("Number: {}", n),
        None => println!("Failed to parse"),
    }
}`,
            hints: ["Use .parse() to get Result", "Use .ok() to convert Result to Option"],
          },
          {
            id: "err-7",
            title: "Option to Result",
            difficulty: 2,
            description: "Learn how to convert an 'Option<T>' to a 'Result<T, E>' in Rust.",
            starterCode: `fn get_value(opt: Option<i32>) -> Result<i32, String> {
    // TODO: Convert Option to Result
    // Use "Value not found" as error message
}

fn main() {
    match get_value(Some(42)) {
        Ok(v) => println!("Value: {}", v),
        Err(e) => println!("Error: {}", e),
    }
}`,
            solution: `fn get_value(opt: Option<i32>) -> Result<i32, String> {
    opt.ok_or(String::from("Value not found"))
}

fn main() {
    match get_value(Some(42)) {
        Ok(v) => println!("Value: {}", v),
        Err(e) => println!("Error: {}", e),
    }
}`,
            hints: ["Use .ok_or() method", "Provide error value for None case"],
          },
          {
            id: "err-8",
            title: "Panic",
            difficulty: 3,
            description: "Learn to handle unrecoverable errors in Rust using 'panic!'.",
            starterCode: `fn divide(a: i32, b: i32) -> i32 {
    if b == 0 {
        // TODO: Panic with message "Cannot divide by zero"
    }
    a / b
}

fn main() {
    let result = divide(10, 2);
    println!("Result: {}", result);
    
    // This will panic
    // divide(10, 0);
}`,
            solution: `fn divide(a: i32, b: i32) -> i32 {
    if b == 0 {
        panic!("Cannot divide by zero");
    }
    a / b
}

fn main() {
    let result = divide(10, 2);
    println!("Result: {}", result);
    
    // This will panic
    // divide(10, 0);
}`,
            hints: ["Use panic! macro", "Pass error message as string"],
          },
          {
            id: "err-9",
            title: "unwrap and expect",
            difficulty: 2,
            description:
              "Learn to handle unrecoverable errors in Rust using 'unwrap' and 'expect' with function calls.",
            starterCode: `fn get_value() -> Option<i32> {
    Some(42)
}

fn main() {
    // TODO: Use unwrap to get value
    let value1 = get_value().__;
    println!("Value 1: {}", value1);
    
    // TODO: Use expect with custom message
    let value2 = get_value().__;
    println!("Value 2: {}", value2);
}`,
            solution: `fn get_value() -> Option<i32> {
    Some(42)
}

fn main() {
    let value1 = get_value().unwrap();
    println!("Value 1: {}", value1);
    
    let value2 = get_value().expect("Failed to get value");
    println!("Value 2: {}", value2);
}`,
            hints: ["Use .unwrap() to panic on None", "Use .expect(msg) for custom panic message"],
          },
        ],
      },
      {
        id: "rust-1-12",
        title: "Traits and Generics",
        duration: "150 min",
        type: "exercise",
        content: `# Traits and Generics

Write flexible, reusable code with traits and generics.`,
        exercises: [
          {
            id: "trait-1",
            title: "Traits",
            difficulty: 2,
            description: "Implement and use traits to define shared behavior in Rust.",
            starterCode: `trait Summary {
    fn summarize(&self) -> String;
}

struct Article {
    title: String,
    content: String,
}

impl Summary for Article {
    fn summarize(&self) -> String {
        // TODO: Return a summary of the article
    }
}

fn main() {
    let article = Article {
        title: String::from("Rust Programming"),
        content: String::from("Rust is awesome!"),
    };
    println!("{}", article.summarize());
}`,
            solution: `trait Summary {
    fn summarize(&self) -> String;
}

struct Article {
    title: String,
    content: String,
}

impl Summary for Article {
    fn summarize(&self) -> String {
        format!("{}: {}", self.title, self.content)
    }
}

fn main() {
    let article = Article {
        title: String::from("Rust Programming"),
        content: String::from("Rust is awesome!"),
    };
    println!("{}", article.summarize());
}`,
            hints: ["Use format! macro", "Access fields with self.field"],
          },
          {
            id: "gen-1",
            title: "Generics",
            difficulty: 2,
            description: "Use generics with traits to create reusable and flexible code.",
            starterCode: `fn largest<T>(list: &[T]) -> &T {
    let mut largest = &list[0];
    
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    
    largest
}

fn main() {
    let numbers = vec![34, 50, 25, 100, 65];
    let result = largest(&numbers);
    println!("Largest: {}", result);
}`,
            solution: `fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    
    largest
}

fn main() {
    let numbers = vec![34, 50, 25, 100, 65];
    let result = largest(&numbers);
    println!("Largest: {}", result);
}`,
            hints: ["Add PartialOrd trait bound", "T: PartialOrd enables comparison"],
          },
          {
            id: "trait-2",
            title: "Trait Bounds",
            difficulty: 3,
            description: "Use trait bounds to constrain generic types in Rust.",
            starterCode: `use std::fmt::Display;

fn print_pair<T, U>(a: T, b: U) {
    // TODO: Print both values
    // Hint: Need Display trait bound
}

fn main() {
    print_pair(5, "hello");
}`,
            solution: `use std::fmt::Display;

fn print_pair<T: Display, U: Display>(a: T, b: U) {
    println!("a = {}, b = {}", a, b);
}

fn main() {
    print_pair(5, "hello");
}`,
            hints: ["Add Display trait bound to T and U", "Use println! to display values"],
          },
          {
            id: "trait-3",
            title: "The AsRef Trait",
            difficulty: 3,
            description:
              "Implement a function that uses the AsRef trait to work seamlessly with borrowed string types.",
            starterCode: `fn print_length<T>(s: T) {
    // TODO: Print the length of s
    // Hint: Use AsRef<str> trait bound
}

fn main() {
    let s1 = String::from("hello");
    let s2 = "world";
    
    print_length(&s1);
    print_length(s2);
}`,
            solution: `fn print_length<T: AsRef<str>>(s: T) {
    println!("Length: {}", s.as_ref().len());
}

fn main() {
    let s1 = String::from("hello");
    let s2 = "world";
    
    print_length(&s1);
    print_length(s2);
}`,
            hints: ["Add AsRef<str> trait bound", "Use .as_ref() to get &str", "Call .len() on the reference"],
          },
        ],
      },
      {
        id: "rust-1-13",
        title: "Iterators and Closures",
        duration: "120 min",
        type: "exercise",
        content: `# Iterators and Closures

Master functional programming patterns in Rust.`,
        exercises: [
          {
            id: "closure-1",
            title: "Closures",
            difficulty: 2,
            description: "Learn how to define and use closures in Rust.",
            starterCode: `fn main() {
    let add = |a, b| __; // TODO: Complete the closure
    
    let result = add(5, 3);
    assert_eq!(result, 8);
    println!("Success!");
}`,
            solution: `fn main() {
    let add = |a, b| a + b;
    
    let result = add(5, 3);
    assert_eq!(result, 8);
    println!("Success!");
}`,
            hints: ["Closures use |params| syntax", "Return a + b"],
          },
          {
            id: "closure-2",
            title: "Closure Types",
            difficulty: 3,
            description: "Understand and define closure types in Rust with practical examples.",
            starterCode: `fn apply<F>(f: F, x: i32) -> i32
where
    F: __, // TODO: Add trait bound for closure
{
    f(x)
}

fn main() {
    let double = |x| x * 2;
    let result = apply(double, 5);
    assert_eq!(result, 10);
    println!("Success!");
}`,
            solution: `fn apply<F>(f: F, x: i32) -> i32
where
    F: Fn(i32) -> i32,
{
    f(x)
}

fn main() {
    let double = |x| x * 2;
    let result = apply(double, 5);
    assert_eq!(result, 10);
    println!("Success!");
}`,
            hints: ["Use Fn trait for closures", "Specify input and output types"],
          },
          {
            id: "iter-1",
            title: "Iterators",
            difficulty: 3,
            description: "Learn to work with Rust iterators by implementing filtering and transformation operations.",
            starterCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6];
    
    // TODO: Filter even numbers and double them
    let result: Vec<i32> = numbers
        .iter()
        .__
        .__
        .collect();
    
    assert_eq!(result, vec![4, 8, 12]);
    println!("Success!");
}`,
            solution: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6];
    
    let result: Vec<i32> = numbers
        .iter()
        .filter(|&&x| x % 2 == 0)
        .map(|&x| x * 2)
        .collect();
    
    assert_eq!(result, vec![4, 8, 12]);
    println!("Success!");
}`,
            hints: [
              "Use .filter() to keep even numbers",
              "Use .map() to double values",
              "Use .collect() to create Vec",
            ],
          },
          {
            id: "iter-2",
            title: "Unique Items",
            difficulty: 3,
            description: "Use Rust iterators to filter and collect unique items from a collection.",
            starterCode: `use std::collections::HashSet;

fn unique_items(items: Vec<i32>) -> Vec<i32> {
    // TODO: Return only unique items
}

fn main() {
    let numbers = vec![1, 2, 2, 3, 3, 3, 4, 5, 5];
    let unique = unique_items(numbers);
    println!("{:?}", unique);
}`,
            solution: `use std::collections::HashSet;

fn unique_items(items: Vec<i32>) -> Vec<i32> {
    let set: HashSet<_> = items.into_iter().collect();
    set.into_iter().collect()
}

fn main() {
    let numbers = vec![1, 2, 2, 3, 3, 3, 4, 5, 5];
    let unique = unique_items(numbers);
    println!("{:?}", unique);
}`,
            hints: ["Convert Vec to HashSet", "HashSet automatically removes duplicates", "Convert back to Vec"],
          },
        ],
      },
      {
        id: "rust-1-14",
        title: "Smart Pointers",
        duration: "150 min",
        type: "exercise",
        content: `# Smart Pointers

Learn about Box, Rc, RefCell, and other smart pointers.`,
        exercises: [
          {
            id: "box-1",
            title: "Box<T>",
            difficulty: 2,
            description: "Understand and use Box<T> to allocate values on the heap.",
            starterCode: `fn main() {
    let b = Box::new(5);
    println!("b = {}", b);
    
    // TODO: Create a box containing a string
}`,
            solution: `fn main() {
    let b = Box::new(5);
    println!("b = {}", b);
    
    let s = Box::new(String::from("hello"));
    println!("s = {}", s);
}`,
            hints: ["Use Box::new() to allocate on heap", "Box can hold any type"],
          },
          {
            id: "drop-1",
            title: "The Drop Trait",
            difficulty: 3,
            description: "Implement custom behavior for a struct when it goes out of scope using the Drop trait.",
            starterCode: `struct CustomSmartPointer {
    data: String,
}

impl Drop for CustomSmartPointer {
    fn drop(&mut self) {
        // TODO: Print a message when dropping
    }
}

fn main() {
    let c = CustomSmartPointer {
        data: String::from("my stuff"),
    };
    println!("CustomSmartPointer created.");
}`,
            solution: `struct CustomSmartPointer {
    data: String,
}

impl Drop for CustomSmartPointer {
    fn drop(&mut self) {
        println!("Dropping CustomSmartPointer with data: {}", self.data);
    }
}

fn main() {
    let c = CustomSmartPointer {
        data: String::from("my stuff"),
    };
    println!("CustomSmartPointer created.");
}`,
            hints: ["Implement drop method", "Print message with self.data", "Drop is called automatically"],
          },
          {
            id: "rc-1",
            title: "Rc<T>",
            difficulty: 3,
            description: "Explore reference-counted smart pointers in Rust using Rc<T> to share data.",
            starterCode: `use std::rc::Rc;

fn main() {
    let a = Rc::new(5);
    let b = Rc::clone(&a);
    
    println!("a = {}, b = {}", a, b);
    println!("Reference count: {}", Rc::strong_count(&a));
}`,
            solution: `use std::rc::Rc;

fn main() {
    let a = Rc::new(5);
    let b = Rc::clone(&a);
    
    println!("a = {}, b = {}", a, b);
    println!("Reference count: {}", Rc::strong_count(&a));
}`,
            hints: [
              "Rc allows multiple ownership",
              "Use Rc::clone() to increment count",
              "Use strong_count() to check references",
            ],
          },
          {
            id: "refcell-1",
            title: "Interior Mutability",
            difficulty: 3,
            description: "Understand and utilize interior mutability in Rust using Rc and RefCell.",
            starterCode: `use std::cell::RefCell;
use std::rc::Rc;

fn main() {
    let value = Rc::new(RefCell::new(5));
    
    // TODO: Modify the value through RefCell
    // TODO: Print the value
}`,
            solution: `use std::cell::RefCell;
use std::rc::Rc;

fn main() {
    let value = Rc::new(RefCell::new(5));
    
    *value.borrow_mut() += 10;
    
    println!("value = {}", value.borrow());
}`,
            hints: [
              "Use .borrow_mut() to get mutable reference",
              "Dereference with * to modify",
              "Use .borrow() to read",
            ],
          },
        ],
      },
      {
        id: "rust-1-15",
        title: "Concurrency",
        duration: "150 min",
        type: "exercise",
        content: `# Concurrency

Write safe concurrent code with threads and message passing.`,
        exercises: [
          {
            id: "thread-1",
            title: "Concurrency",
            difficulty: 3,
            description: "Use threads to mutate a shared vector with non-deterministic ordering.",
            starterCode: `use std::thread;
use std::sync::{Arc, Mutex};

fn main() {
    let counter = Arc::new(Mutex::new(vec![]));
    let mut handles = vec![];
    
    for i in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            // TODO: Lock and push i to the vector
        });
        handles.push(handle);
    }
    
    for handle in handles {
        handle.join().unwrap();
    }
    
    println!("Result: {:?}", *counter.lock().unwrap());
}`,
            solution: `use std::thread;
use std::sync::{Arc, Mutex};

fn main() {
    let counter = Arc::new(Mutex::new(vec![]));
    let mut handles = vec![];
    
    for i in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            num.push(i);
        });
        handles.push(handle);
    }
    
    for handle in handles {
        handle.join().unwrap();
    }
    
    println!("Result: {:?}", *counter.lock().unwrap());
}`,
            hints: ["Use .lock() to access Mutex", "Push value to vector", "Mutex ensures thread safety"],
          },
          {
            id: "channel-1",
            title: "Channels",
            difficulty: 3,
            description: "Learn how to communicate between threads using Rust's mpsc channels.",
            starterCode: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    
    thread::spawn(move || {
        // TODO: Send a message through the channel
    });
    
    // TODO: Receive and print the message
}`,
            solution: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    
    thread::spawn(move || {
        let val = String::from("hi");
        tx.send(val).unwrap();
    });
    
    let received = rx.recv().unwrap();
    println!("Got: {}", received);
}`,
            hints: ["Use tx.send() to send message", "Use rx.recv() to receive", "recv() blocks until message arrives"],
          },
          {
            id: "channel-2",
            title: "Shared State Concurrency",
            difficulty: 4,
            description: "Implement and manage shared state in concurrent programming using threads and Mutex in Rust.",
            starterCode: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];
    
    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            // TODO: Increment counter by 1
        });
        handles.push(handle);
    }
    
    for handle in handles {
        handle.join().unwrap();
    }
    
    println!("Result: {}", *counter.lock().unwrap());
}`,
            solution: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];
    
    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }
    
    for handle in handles {
        handle.join().unwrap();
    }
    
    println!("Result: {}", *counter.lock().unwrap());
}`,
            hints: ["Lock the mutex", "Dereference and increment", "Result should be 10"],
          },
        ],
      },
      {
        id: "rust-1-16",
        title: "Lifetimes",
        duration: "120 min",
        type: "exercise",
        content: `# Lifetimes

Understand and implement lifetimes in Rust to ensure memory safety.`,
        exercises: [
          {
            id: "life-1",
            title: "Lifetimes",
            difficulty: 3,
            description: "Understand and implement lifetimes in Rust to ensure memory safety.",
            starterCode: `fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

fn main() {
    let string1 = String::from("long string");
    let string2 = String::from("xyz");
    let result = longest(&string1, &string2);
    println!("Longest: {}", result);
}`,
            solution: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

fn main() {
    let string1 = String::from("long string");
    let string2 = String::from("xyz");
    let result = longest(&string1, &string2);
    println!("Longest: {}", result);
}`,
            hints: [
              "Add lifetime parameter 'a",
              "All references must have same lifetime",
              "Return value has same lifetime",
            ],
          },
        ],
      },
    ],
  },
  // ... existing Solana and Anchor modules ...

  {
    id: 20,
    slug: "solana-fundamentals",
    title: "Solana Fundamentals",
    description: "Learn the basics of Solana blockchain architecture with hands-on exercises",
    duration: "20 hours",
    icon: "BookOpen",
    lessons: [
      {
        id: "solana-1-1",
        title: "Introduction to Solana",
        duration: "60 min",
        type: "reading",
        content: `# Introduction to Solana

Solana is a high-performance blockchain designed for mass adoption. Learn about its history and key features.`,
        exercises: [
          {
            id: "intro-1",
            title: "Understanding Solana's Key Features",
            difficulty: 1,
            description: "Identify Solana's main advantages over other blockchains.",
            starterCode: `fn main() {
    // TODO: Print Solana's TPS capability (hint: 65000)
}`,
            solution: `fn main() {
    println!("Solana TPS: 65000");
}`,
            hints: ["Solana's TPS is 65,000", "Use println! macro"],
          },
        ],
      },
      {
        id: "solana-1-2",
        title: "Solana Accounts Model",
        duration: "90 min",
        type: "exercise",
        content: `# Solana Accounts Model

Understand Solana's account-based architecture, including program accounts and data accounts.`,
        exercises: [
          {
            id: "account-1",
            title: "Creating a Basic Account Structure",
            difficulty: 1,
            description: "Define a struct representing a Solana account.",
            starterCode: `struct Account {
    // TODO: Add fields for lamports and data
}

fn main() {
    let account = Account { lamports: 1000000, data: vec![] };
    println!("Account created");
}`,
            solution: `struct Account {
    lamports: u64,
    data: Vec<u8>,
}

fn main() {
    let account = Account { lamports: 1000000, data: vec![] };
    println!("Account created");
}`,
            hints: ["lamports: u64", "data: Vec<u8>"],
          },
          {
            id: "account-2",
            title: "Program vs Data Accounts",
            difficulty: 2,
            description: "Distinguish between program and data accounts.",
            starterCode: `enum AccountType {
    // TODO: Add variants for Program and Data
}

fn main() {
    let program = AccountType::Program;
    println!("{:?}", program);
}`,
            solution: `enum AccountType {
    Program,
    Data,
}

fn main() {
    let program = AccountType::Program;
    println!("{:?}", program);
}`,
            hints: ["Enum variants: Program, Data"],
          },
          {
            id: "account-3",
            title: "Rent and Account Size",
            difficulty: 2,
            description: "Calculate minimum rent-exempt balance.",
            starterCode: `fn calculate_rent_exempt(size: usize) -> u64 {
    // TODO: Rent exempt = size * 2 (simplified)
}

fn main() {
    assert_eq!(calculate_rent_exempt(100), 200);
}`,
            solution: `fn calculate_rent_exempt(size: usize) -> u64 {
    (size as u64) * 2
}

fn main() {
    assert_eq!(calculate_rent_exempt(100), 200);
}`,
            hints: ["Simplified formula: size * 2"],
          },
        ],
      },
      {
        id: "solana-1-3",
        title: "Transactions and Instructions",
        duration: "120 min",
        type: "exercise",
        content: `# Transactions and Instructions

Learn how Solana processes transactions and instructions.`,
        exercises: [
          {
            id: "tx-1",
            title: "Building a Transaction",
            difficulty: 2,
            description: "Define a basic transaction structure.",
            starterCode: `struct Transaction {
    // TODO: Add signatures and message fields
}

fn main() {
    let tx = Transaction { signatures: vec![], message: String::new() };
    println!("Transaction created");
}`,
            solution: `struct Transaction {
    signatures: Vec<String>,
    message: String,
}

fn main() {
    let tx = Transaction { signatures: vec![], message: String::new() };
    println!("Transaction created");
}`,
            hints: ["signatures: Vec<String>", "message: String"],
          },
          {
            id: "tx-2",
            title: "Instruction Components",
            difficulty: 2,
            description: "Create an instruction enum.",
            starterCode: `struct Instruction {
    program_id: String,
    accounts: Vec<String>,
    data: Vec<u8>,
}

fn main() {
    let instr = Instruction {
        program_id: String::from("system"),
        accounts: vec![],
        data: vec![],
    };
    println!("Instruction created");
}`,
            solution: `struct Instruction {
    program_id: String,
    accounts: Vec<String>,
    data: Vec<u8>,
}

fn main() {
    let instr = Instruction {
        program_id: String::from("system"),
        accounts: vec![],
        data: vec![],
    };
    println!("Instruction created");
}`,
            hints: ["program_id: String", "accounts: Vec<String>", "data: Vec<u8>"],
          },
          {
            id: "tx-3",
            title: "Signature Verification",
            difficulty: 3,
            description: "Implement a simple signature check.",
            starterCode: `fn verify_signature(sig: &str, expected: &str) -> bool {
    // TODO: Check if sig == expected
}

fn main() {
    assert!(verify_signature("valid", "valid"));
}`,
            solution: `fn verify_signature(sig: &str, expected: &str) -> bool {
    sig == expected
}

fn main() {
    assert!(verify_signature("valid", "valid"));
}`,
            hints: ["Simple string comparison for demo"],
          },
          {
            id: "tx-4",
            title: "Transaction Fees",
            difficulty: 3,
            description: "Calculate basic transaction fees.",
            starterCode: `fn calculate_fee(sig_count: u32) -> u64 {
    // TODO: Fee = sig_count * 5000 lamports (simplified)
}

fn main() {
    assert_eq!(calculate_fee(1), 5000);
}`,
            solution: `fn calculate_fee(sig_count: u32) -> u64 {
    (sig_count as u64) * 5000
}

fn main() {
    assert_eq!(calculate_fee(1), 5000);
}`,
            hints: ["Simplified: sig_count * 5000"],
          },
          {
            id: "tx-5",
            title: "Nonce Accounts",
            difficulty: 3,
            description: "Understand nonce for offline signing.",
            starterCode: `struct NonceAccount {
    nonce: String,
}

fn main() {
    let nonce = NonceAccount { nonce: "random".to_string() };
    println!("Nonce: {}", nonce.nonce);
}`,
            solution: `struct NonceAccount {
    nonce: String,
}

fn main() {
    let nonce = NonceAccount { nonce: "random".to_string() };
    println!("Nonce: {}", nonce.nonce);
}`,
            hints: ["Nonce is a string for demo"],
          },
        ],
      },
      {
        id: "solana-1-4",
        title: "Proof of History (PoH)",
        duration: "90 min",
        type: "reading",
        content: `# Proof of History (PoH)

Understand Solana's unique consensus mechanism.`,
        exercises: [
          {
            id: "poh-1",
            title: "PoH Sequence",
            difficulty: 2,
            description: "Simulate PoH timestamping.",
            starterCode: `fn poh_timestamp(prev: u64, current: u64) -> bool {
    // TODO: Check if current > prev
}

fn main() {
    assert!(poh_timestamp(1, 2));
}`,
            solution: `fn poh_timestamp(prev: u64, current: u64) -> bool {
    current > prev
}

fn main() {
    assert!(poh_timestamp(1, 2));
}`,
            hints: ["Simple sequence check"],
          },
        ],
      },
      {
        id: "solana-1-5",
        title: "Tower BFT",
        duration: "90 min",
        type: "reading",
        content: `# Tower BFT

Learn about Solana's consensus algorithm.`,
        exercises: [
          {
            id: "tower-1",
            title: "Vote Simulation",
            difficulty: 2,
            description: "Simulate validator voting.",
            starterCode: `fn vote_weight(votes: u32, total: u32) -> f64 {
    // TODO: Return votes / total as f64
}

fn main() {
    assert_eq!(vote_weight(67, 100), 0.67);
}`,
            solution: `fn vote_weight(votes: u32, total: u32) -> f64 {
    votes as f64 / total as f64
}

fn main() {
    assert_eq!(vote_weight(67, 100), 0.67);
}`,
            hints: ["Cast to f64 for division"],
          },
        ],
      },
      {
        id: "solana-1-6",
        title: "Validators and Staking",
        duration: "120 min",
        type: "exercise",
        content: `# Validators and Staking

Understand network security in Solana.`,
        exercises: [
          {
            id: "stake-1",
            title: "Stake Calculation",
            difficulty: 2,
            description: "Calculate rewards based on stake.",
            starterCode: `fn calculate_reward(stake: u64, rate: f64) -> u64 {
    // TODO: Return stake * rate as u64
}

fn main() {
    assert_eq!(calculate_reward(1000, 0.05), 50);
}`,
            solution: `fn calculate_reward(stake: u64, rate: f64) -> u64 {
    (stake as f64 * rate) as u64
}

fn main() {
    assert_eq!(calculate_reward(1000, 0.05), 50);
}`,
            hints: ["Cast to f64 for multiplication"],
          },
        ],
      },
      {
        id: "solana-1-7",
        title: "Runtime and BPF",
        duration: "90 min",
        type: "reading",
        content: `# Runtime and BPF

Learn about Solana's execution environment.`,
        exercises: [
          {
            id: "bpf-1",
            title: "Program Loading",
            difficulty: 3,
            description: "Simulate program loading.",
            starterCode: `fn load_program(code: Vec<u8>) -> bool {
    // TODO: Return true if code.len() > 0
}

fn main() {
    assert!(load_program(vec![1,2,3]));
}`,
            solution: `fn load_program(code: Vec<u8>) -> bool {
    !code.is_empty()
}

fn main() {
    assert!(load_program(vec![1,2,3]));
}`,
            hints: ["Check if not empty"],
          },
        ],
      },
      {
        id: "solana-1-8",
        title: "Clusters and Testnets",
        duration: "60 min",
        type: "reading",
        content: `# Clusters and Testnets

Understand different Solana networks.`,
        exercises: [
          {
            id: "cluster-1",
            title: "Cluster Selection",
            difficulty: 1,
            description: "Select Devnet cluster.",
            starterCode: `fn get_cluster() -> String {
    // TODO: Return "devnet"
}

fn main() {
    assert_eq!(get_cluster(), "devnet");
}`,
            solution: `fn get_cluster() -> String {
    "devnet".to_string()
}

fn main() {
    assert_eq!(get_cluster(), "devnet");
}`,
            hints: ["Return devnet string"],
          },
        ],
      },
      // Add more lessons as needed, e.g., 9-15 for advanced topics like Sealevel Runtime, Parallel Execution, Gulf Stream, etc.
    ],
  },
  {
    id: 21,
    slug: "rust-programming-basics",
    title: "Rust Programming Basics",
    description: "Master Rust fundamentals for Solana development with 75+ hands-on exercises",
    duration: "40 hours",
    icon: "Code",
    lessons: [
      // Existing lessons from provided code
      {
        id: "rust-2-1",
        title: "Getting Started",
        duration: "45 min",
        type: "exercise",
        content: `# Getting Started with Rust

Welcome to your Rust journey! Let's start with the basics.`,
        exercises: [
          {
            id: "hello-2",
            title: "Printing Hello World",
            difficulty: 1,
            description: "Create a function that prints 'Hello, Rust!' to the console.",
            starterCode: `fn main() {
    // TODO: Print "Hello, Rust!"
}`,
            solution: `fn main() {
    println!("Hello, Rust!");
}`,
            hints: ["Use println! macro"],
          },
          // Add 4 more exercises for this lesson
          {
            id: "hello-3",
            title: "Formatted Printing",
            difficulty: 1,
            description: "Print a formatted string.",
            starterCode: `fn main() {
    let name = "Rust";
    // TODO: Print "Hello, {name}!"
}`,
            solution: `fn main() {
    let name = "Rust";
    println!("Hello, {}!", name);
}`,
            hints: ["Use {} placeholder"],
          },
          {
            id: "hello-4",
            title: "Multiple Prints",
            difficulty: 1,
            description: "Print multiple lines.",
            starterCode: `fn main() {
    // TODO: Print "Line 1" and "Line 2"
}`,
            solution: `fn main() {
    println!("Line 1");
    println!("Line 2");
}`,
            hints: ["Use multiple println!"],
          },
          {
            id: "hello-5",
            title: "Debug Printing",
            difficulty: 2,
            description: "Use debug print for a variable.",
            starterCode: `fn main() {
    let num = 42;
    // TODO: Print num with {:?}
}`,
            solution: `fn main() {
    let num = 42;
    println!("{:?}", num);
}`,
            hints: ["Use {:?} for debug"],
          },
          {
            id: "hello-6",
            title: "Pretty Debug",
            difficulty: 2,
            description: "Use pretty debug print.",
            starterCode: `fn main() {
    let data = vec![1, 2, 3];
    // TODO: Print data with {:#?}
}`,
            solution: `fn main() {
    let data = vec![1, 2, 3];
    println!("{:#?}", data);
}`,
            hints: ["Use {:#?} for pretty print"],
          },
        ],
      },
      // Expand existing lessons with more exercises
      {
        id: "rust-2-2",
        title: "Variables",
        duration: "90 min",
        type: "exercise",
        content: `# Variables and Mutability

In Rust, variables are immutable by default.`,
        exercises: [
          // Existing exercises + 3 more
          {
            id: "var-1",
            title: "Declaring Variables",
            difficulty: 1,
            description: "Declare immutable variables.",
            starterCode: `fn main() {
    let __ = 5;
    println!("x = {}", x);
}`,
            solution: `fn main() {
    let x = 5;
    println!("x = {}", x);
}`,
            hints: ["Fill in x"],
          },
          // ... existing
          {
            id: "var-5",
            title: "Shadowing Advanced",
            difficulty: 2,
            description: "Shadow with different type.",
            starterCode: `fn main() {
    let x = "hello";
    let x = x.len();
    println!("x = {}", x);
}`,
            solution: `fn main() {
    let x = "hello";
    let x = x.len();
    println!("x = {}", x); // 5
}`,
            hints: ["Shadowing allows type change"],
          },
          {
            id: "var-6",
            title: "Constants vs Immutables",
            difficulty: 2,
            description: "Use const for global.",
            starterCode: `fn main() {
    __ PI = 3.14;
    println!("PI = {}", PI);
}`,
            solution: `fn main() {
    const PI: f64 = 3.14;
    println!("PI = {}", PI);
}`,
            hints: ["const PI: f64"],
          },
        ],
      },
      // Continue expanding each existing Rust lesson with 4-6 exercises
      // For brevity, adding one more lesson example
      {
        id: "rust-2-3",
        title: "Data Types Expanded",
        duration: "120 min",
        type: "exercise",
        content: `# Primitive Data Types Expanded

Explore more types like arrays, tuples.`,
        exercises: [
          // 5 exercises
          {
            id: "type-4",
            title: "Array Access",
            difficulty: 1,
            description: "Access array element.",
            starterCode: `fn main() {
    let arr = [1, 2, 3];
    println!("{}", arr[1]);
}`,
            solution: `fn main() {
    let arr = [1, 2, 3];
    println!("{}", arr[1]); // 2
}`,
            hints: ["arr[1] = second element"],
          },
          // Add more...
        ],
      },
      // Add 10+ more lessons for Rust, e.g., "Advanced Functions", "Error Handling", etc., with 5 exercises each
      // Example additional lesson
      {
        id: "rust-2-17",
        title: "Advanced Error Handling",
        duration: "90 min",
        type: "exercise",
        content: `# Advanced Error Handling

Use custom errors and propagation.`,
        exercises: [
          // 5 exercises
          {
            id: "adv-err-1",
            title: "Custom Error Enum",
            difficulty: 3,
            description: "Define custom error.",
            starterCode: `enum AppError {
    IoError,
    ParseError,
}

fn main() {
    println!("Error enum defined");
}`,
            solution: `enum AppError {
    IoError,
    ParseError,
}

fn main() {
    println!("Error enum defined");
}`,
            hints: ["Enum for errors"],
          },
          // Add more...
        ],
      },
      // ... Add up to 20 Rust lessons total
    ],
  },
  {
    id: 23,
    slug: "smart-contract-development-with-anchor",
    title: "Smart Contract Development with Anchor",
    description: "Build Solana programs using Anchor framework with hands-on projects",
    duration: "50 hours",
    icon: "Code",
    lessons: [
      {
        id: "anchor-3-1",
        title: "Introduction to Anchor",
        duration: "60 min",
        type: "reading",
        content: `# Introduction to Anchor

Anchor is a framework for Solana smart contract development.`,
        exercises: [
          {
            id: "anchor-intro-1",
            title: "Anchor Setup",
            difficulty: 1,
            description: "Simulate Anchor init.",
            starterCode: `fn init_anchor() -> String {
    "anchor init myprogram".to_string()
}

fn main() {
    println!("{}", init_anchor());
}`,
            solution: `fn init_anchor() -> String {
    "anchor init myprogram".to_string()
}

fn main() {
    println!("{}", init_anchor());
}`,
            hints: ["Return command string"],
          },
        ],
      },
      {
        id: "anchor-3-2",
        title: "Defining Accounts",
        duration: "90 min",
        type: "exercise",
        content: `# Defining Accounts in Anchor

Use #[account] macro.`,
        exercises: [
          {
            id: "anchor-acc-1",
            title: "Basic Account Struct",
            difficulty: 2,
            description: "Define an account.",
            starterCode: `#[account]
pub struct MyAccount {
    // TODO: Add data field
}

fn main() {
    println!("Account defined");
}`,
            solution: `#[account]
pub struct MyAccount {
    data: u64,
}

fn main() {
    println!("Account defined");
}`,
            hints: ["Add data: u64"],
          },
          // Add 4 more exercises
        ],
      },
      {
        id: "anchor-3-3",
        title: "Instructions and Handlers",
        duration: "120 min",
        type: "exercise",
        content: `# Instructions and Handlers

Write program instructions.`,
        exercises: [
          {
            id: "anchor-instr-1",
            title: "Initialize Account",
            difficulty: 2,
            description: "Write initialize handler.",
            starterCode: `#[program]
pub mod myprogram {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        // TODO: Set data to 0
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}

#[account]
pub struct MyAccount {
    data: u64,
}`,
            solution: `#[program]
pub mod myprogram {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.my_account.data = 0;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}

#[account]
pub struct MyAccount {
    data: u64,
}`,
            hints: ["Set ctx.accounts.my_account.data = 0"],
          },
          // Add more...
        ],
      },
      // Add 12+ more Anchor lessons, e.g., "Testing with Anchor", "Deploying Programs", "Cross-Program Invocations", "Events and Logs", "Upgradable Programs", "Security Best Practices", etc., with 4-6 exercises each
      {
        id: "anchor-3-4",
        title: "Testing Anchor Programs",
        duration: "90 min",
        type: "project",
        content: `# Testing Anchor Programs

Use Anchor's testing framework.`,
        exercises: [
          {
            id: "anchor-test-1",
            title: "Basic Test",
            difficulty: 3,
            description: "Write a test for initialize.",
            starterCode: `#[cfg(test)]
mod tests {
    use super::*;
    use anchor_lang::prelude::*;

    #[test]
    fn test_initialize() -> Result<()> {
        // TODO: Simulate initialize and assert data == 0
    }
}`,
            solution: `#[cfg(test)]
mod tests {
    use super::*;
    use anchor_lang::prelude::*;

    #[test]
    fn test_initialize() -> Result<()> {
        let mut program = MyProgram {};
        let mut my_account = MyAccount { data: 1 };
        let ctx = Context::new(
            &mut program,
            Initialize { my_account: &mut my_account },
        );
        initialize(ctx)?;
        assert_eq!(my_account.data, 0);
        Ok(())
    }
}`,
            hints: ["Create mock context", "Call initialize", "Assert data"],
          },
          // Add more...
        ],
      },
      // ... Expand to 15 lessons total
    ],
  },
  
]

export function getModuleBySlug(slug: string): Module | undefined {
  return courseModules.find((module) => module.slug === slug)
}

export function getLessonById(moduleSlug: string, lessonId: string): Lesson | undefined {
  const module = getModuleBySlug(moduleSlug)
  return module?.lessons.find((lesson) => lesson.id === lessonId)
}
