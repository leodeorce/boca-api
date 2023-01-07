import { ApiError } from "../../../errors/ApiError";

class RequestValidator {

  hasRequiredProperties(request: object, requiredProperties: string[]): void {
    const requestProperties = Object.keys(request);
    const missingProperties = this.checkExists(
      requestProperties,
      requiredProperties
    );
    if (missingProperties.length != 0) {
      throw ApiError.badRequest(`Missing: ${missingProperties}`);
    }
  }

  private checkExists(
    requestProperties: string[],
    requiredProperties: string[]
  ): string[] {
    const missingProperties: string[] = [];
    for (const property of requiredProperties) {
      if (!requestProperties.includes(property)) {
        missingProperties.push(property);
      }
    }
    return missingProperties;
  }
}

export { RequestValidator };
