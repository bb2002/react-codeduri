export enum Language {
    C = "c",
    CPP = "cpp",
    JAVA = "java",
    PYTHON3 = "py3"
}

export const LANGUAGE_ARRAY = [
    Language.C, Language.CPP,
    Language.JAVA, Language.PYTHON3
]

export const getNameOfLanguage = (language: Language) => {
    switch(language) {
        case Language.C:        return "C"
        case Language.CPP:      return "C++"
        case Language.JAVA:     return "Java"
        case Language.PYTHON3:  return "Python 3"
    }
}

export const stringToLanguage = (value: string) => {
    switch(value) {
        case "c":       return Language.C
        case "cpp":     return Language.CPP
        case "java":    return Language.JAVA
        case "py3":     return Language.PYTHON3
    }
}

export const getBadgeOfLanguage = (language: Language) => {
    switch(language) {
        case Language.C:        return "https://img.shields.io/badge/-C-%23005597"
        case Language.CPP:      return "https://img.shields.io/badge/-C%2B%2B-%2300427D"
        case Language.JAVA:     return "https://img.shields.io/badge/-Java-%23DF6300"
        case Language.PYTHON3:  return "https://img.shields.io/badge/-Python-%234783B4"
    }
}

export const getTemplateOfLanguage = (language: Language) => {
    switch(language) {
        case Language.C:
            return `#include<stdio.h>

int main() {

}`
        case Language.CPP:
            return`#include<iostream>

using namespace std;

int main() {

}`
        case Language.JAVA:
            return `public class Main {
    public static void main(String[] args) {
    
    }
}`
        case Language.PYTHON3:
            return ``
    }
}