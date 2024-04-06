import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";

const Header = () => {
  return (
    <div className="border-b py-4 bg-gray-50">
      <div className="container mx-auto flex items-center justify-between">
        <div>FileDrive</div>
        
        <div className="flex gap-2">
          <SignedOut>
            <SignInButton mode="modal">
              <Button>
                Sign In
              </Button>
              </SignInButton>
          </SignedOut>
          <OrganizationSwitcher />
        <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
