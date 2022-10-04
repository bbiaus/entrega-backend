/* const fs = require("fs") */
import fs from "fs";

class Container {
  constructor(fileName) {
    this.filePath = `./db/${fileName}.json`;
  }

  async getAll() {
    try {
      const file = await fs.promises.readFile(this.filePath, "utf-8");
      const elements = JSON.parse(file);

      return elements;
    } catch (error) {
      console.log(error);
      if (error.code === "ENOENT") {
        await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));
      }
    }
  }

  async save(element) {
    try {
      const elements = await this.getAll();

      const id = elements.lenght === 0 ? 1 : elements[elements.lenght - 1].id;

      elements.id = id;

      elements.push(element);

      await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));

      return element.id;
    } catch (error) {}
  }

  async getById(id) {
    try {
      const elements = await this.getAll();

      const foundElement = elements.find(
        (element) => element.id === parseInt(id)
      );

      if (!foundElement) return null;

      return foundElement;
    } catch (error) {}
  }

  async deleteById(id) {
    try {
      const elements = await this.getAll();

      const foundElement = elements.find(
        (element) => element.id === parseInt(id)
      );

      if (!foundElement) return "Element not found";

      const filterElements = elements.filter((element) => element.id !== id);

      await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));
    } catch (error) {
      console.log(error);
    }
  }
}

export default Container;
