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
      if (error.code === "ENOENT") {
        await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));
      }
      throw Error(error);
    }
  }

  async save(element) {
    try {
      const elements = await this.getAll();

      const id =
        elements.length === 0 ? 1 : elements[elements.length - 1].id + 1;
      element.id = id;

      elements.push(element);

      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(elements, null, 3)
      );

      return element.id;
    } catch (error) {
      throw Error(error);
    }
  }

  async getById(id) {
    try {
      const numId = parseInt(id);
      const elements = await this.getAll();

      const foundElement = elements.find((element) => element.id === numId);

      if (!foundElement) return null;

      return foundElement;
    } catch (error) {
      throw Error(error);
    }
  }

  async updateById(id, element) {
    try {
      const numId = parseInt(id);

      await this.deleteById(id);

      const elements = await this.getAll();

      element.id = numId;

      elements.push(element);

      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(elements, null, 3)
      );
    } catch (error) {
      throw Error(error);
    }
  }

  async deleteById(id) {
    try {
      const numId = parseInt(id);

      const elements = await this.getAll();

      const foundElement = elements.find((element) => element.id === numId);

      if (!foundElement) return "Element not found";

      const filterElements = elements.filter((element) => element.id !== numId);

      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(filterElements, null, 3)
      );
    } catch (error) {
      throw Error(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));
    } catch (error) {
      throw Error(error);
    }
  }
}

export default Container;
