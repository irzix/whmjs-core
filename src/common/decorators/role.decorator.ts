export function requireRole(role: string) {
  return (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
      const user = args[0]?.user;
      if (!user || user.role !== role) {
        throw new Error(`Unauthorized: ${role} role required`);
      }
      return originalMethod.apply(this, args);
    };
    
    return descriptor;
  };
}